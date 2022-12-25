class ApplicationController < ActionController::Base
	include DeviseHackFakeSessionConcern
	include DeviseTokenAuth::Concerns::SetUserByToken
	helper_method :current_user, :user_signed_in?
	before_action :configure_permitted_parameters, if: :devise_controller?
	# skip_before_action :handle_unverified_request
	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image])
	end
end
