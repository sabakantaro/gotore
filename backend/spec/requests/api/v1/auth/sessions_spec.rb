require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe 'SessionsAPI' do
    it "get session user" do
      FactoryBot.create(:user)
      user = { email: "test@test.com", password: "password" }
      auth_tokens = sign_in(user)
      get '/api/v1/chat_rooms', headers: auth_tokens

      expect(response.status).to eq(200)
    end

    it "get 401 without login" do
      get '/api/v1/auth/sessions'

      expect(response.status).to eq(401)
    end
  end
end
