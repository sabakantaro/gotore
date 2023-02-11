class Api::V1::Auth::SessionsController < ApplicationController
  def index
    return head 401 unless api_v1_user_signed_in?
    render json: { current_user: current_api_v1_user.as_json() }, status: :ok
  end
end
