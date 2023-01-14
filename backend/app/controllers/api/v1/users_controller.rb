class Api::V1::UsersController < ApplicationController
	before_action :set_user, only: [:show, :update]

	def show
		render json: {
			user: user_to_json(@user),
			favorite_events: event_to_json(@user.my_favorite_events),
			is_followed: current_api_v1_user.following?(@user),
		}, status: :ok
	end

	def update
		if @user.update(user_params)
			render json: { user: @user }, status: :ok
		else
			render json: { user: @user.errors }, status: :internal_server_error
		end
	end

	private

	def set_user
		@user = User.find(params[:id])
	end

	def user_to_json(user)
    user.as_json(
      only: %i[id uid name email image profile province_id],
      methods: %i[image_url my_favorite_event_ids my_notifications_count followings_count followers_count evaluation_score],
    )
  end

	def event_to_json(events)
		events.as_json(
			methods: %i[image_url],
			include: [
				user: {
					methods: %i[image_url],
				},
				category: {
					only: %i[id name]
				},
				events_favorites: {
					only: %i[id]
				},
			],
		)
	end

	def user_params
	params.require(:user).permit(:image, :name, :province_id, :profile)
	end
end

