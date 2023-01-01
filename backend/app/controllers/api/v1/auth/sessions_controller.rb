class Api::V1::Auth::SessionsController < ApplicationController
  def index
    current_user = current_api_v1_user.present? ? current_user_to_json(current_api_v1_user) : nil
    render json: { current_user: current_user }, status: :ok
  end

  private

  def current_user_to_json(user)
    user.as_json(
      only: %i[id uid name email image],
      methods: %i[image_url my_favorite_event_ids my_notifications_count],
    )
  end
end
