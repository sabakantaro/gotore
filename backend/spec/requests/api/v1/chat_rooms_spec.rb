require 'rails_helper'

RSpec.describe "Api::V1::ChatRooms", type: :request do
  describe "GET /index" do
    it "get all chat_rooms" do
      FactoryBot.create(:user)
      user = { email: "test@test.com", password: "password" }
      auth_tokens = sign_in(user)
      get '/api/v1/chat_rooms', headers: auth_tokens

      expect(response.status).to eq(200)
    end

    it "return 404 without signin" do
      get '/api/v1/chat_rooms'

      expect(response.status).to eq(401)
    end
  end
end
