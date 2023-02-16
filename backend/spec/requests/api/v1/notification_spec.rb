require 'rails_helper'

RSpec.describe "Api::V1::Notifications", type: :request do
  describe "GET /index" do
    it "get all notifications" do
      FactoryBot.create(:user)
      user = { email: "test@test.com", password: "password" }
      auth_tokens = sign_in(user)
      get '/api/v1/notifications', headers: auth_tokens

      expect(response.status).to eq(200)
    end

    it "get 500 without signin" do
      get '/api/v1/notifications'

      expect(response.status).to eq(500)
    end
  end
end
