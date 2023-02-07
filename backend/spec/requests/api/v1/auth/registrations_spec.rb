require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "AuthRegistrationsAPI" do
    it "sign up" do
      post '/api/v1/auth/', params: { email: "sign_up_test@test.com", password: "password" }, as: :json

      expect(response.status).to eq(200)
    end
  end
end
