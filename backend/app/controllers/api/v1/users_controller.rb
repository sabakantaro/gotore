class Api::V1::UsersController < ApplicationController
	def update
		@user = User.find(params[:id])
		if @user.update(user_params)
			render json: { user: @user }, status: :ok
		else
			render json: { user: @user.errors }, status: :internal_server_error
		end
	end

	private

	def user_params
	params.require(:user).permit(:image, :name)
	end
end

