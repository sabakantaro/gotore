class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # before_action :configure_permitted_parameters, only: [:edit, :update, :show, :destory]
  # before_action :validate_account_update_params, except: [:update]
  # skip_before_action :verify_authenticity_token
  # protect_from_forgery except: [:update]

  private
  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :image)
  end

  protected

  def update_resource(resource, params)
    resource.update_without_current_password(params)
  end

  # protected

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image])
  # end
end

# curl -F "email=test@t.com" -F "password=password" -F "password=password_confirmation" -F "name=Mr.Muscle" -F "image=@sample.jpg" http://localhost:5000/api/v1/auth
# curl -X PATCH http://localhost:5000/api/v1/users/2 -d "[name]=Mr.Muscle&[email]=t@t.com&[password]=password&[image]=@sample.jpg"
