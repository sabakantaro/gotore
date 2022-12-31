class Api::V1::Auth::SessionsController < ApplicationController
  def index
    current_user = current_api_v1_user.present? ? current_user_to_json(current_api_v1_user) : nil
    notifications_count = Notification.where(is_checked: false).count
      render json: {
        current_user: current_user,
        notifications_count: notifications_count,
        }, status: :ok
  end

  private

  def current_user_to_json(current_user)
    current_user.as_json(only: [:id, :uid, :name, :email, :image])
  end
end
