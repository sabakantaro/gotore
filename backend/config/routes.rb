Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :users do
        resource :relationships, only: [:create, :destroy]
        get 'followings' => 'relationships#followings', as: 'followings'
        get 'followers' => 'relationships#followers', as: 'followers'
        resource :evaluations, only: [:create]
      end
      resources :notifications
      resources :participates
      resources :chat_rooms
      resources :messages
      resources :categories
      resources :cities
      resources :events do
        resource :events_favorites
        resources :comments, only: [:create, :destroy]
      end

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end