class Api::V1::UsersController < ApplicationController
	def show
		@user = User.find_by(id: params[:id])
	end

	def edit
		@user = User.find(params[:id])
	end

	def update
		@user = User.find(params[:id])

		if current_api_v1_user == @user
			if @user.update(user_params)

				render json: { user: @user }, status: :ok
			else
				render json: { user: @user.errors }, status: :internal_server_error
			end
		end
		head 500
	end

	private

	def user_params
	params.require(:user).permit(:image, :name)
	end
end

