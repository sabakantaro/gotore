class Api::V1::EventsFavoritesController < ApplicationController
	def create
    return head 403 if EventsFavorite.where(events_favorites_params).present?
		EventsFavorite.create(events_favorites_params)
	  head 200
	end

  def destroy
    return head 403 unless current_api_v1_user.present?
		events_favorites = EventsFavorite.find_by(user_id: current_api_v1_user.id, event_id: params[:event_id])
    events_favorites.destroy
		head 200
	end

  def events_favorites_params
		params.require(:events_favorite).permit(:user_id, :event_id)
	end
end
