require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe 'SessionsAPI' do
    it "get 404 without login" do
      get '/api/v1/auth/sessions'

      expect(response.status).to eq(401)
    end
  end
end
