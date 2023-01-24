class Api::V1::UsersController < ApplicationController
	before_action :set_user, only: [:show, :update]

	def show
		render json: {
			user: @user.as_json(),
			participate_events: @user.participate_events.includes(:user, :category, :events_favorites).as_json(),
			favorite_events: @user.my_favorite_events.includes(:user, :category, :events_favorites).as_json(),
			is_followed: api_v1_user_signed_in? && current_api_v1_user.following?(@user),
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

	def user_params
	params.require(:user).permit(:image, :name, :city_id, :profile)
	end
end

