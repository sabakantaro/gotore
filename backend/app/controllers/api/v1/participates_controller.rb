class Api::V1::ParticipatesController < ApplicationController
	def create
		participate = Participate.create(
			event_id: participates_params[:event_id],
			user_id: participates_params[:user_id],
		)

		chat_room = ChatRoom.create

		ChatRoomUser.find_or_create_by(
			chat_room_id: chat_room.id,
			user_id: participate.user_id,
		)

		event = Event.find_by(id: participate.event_id)
		ChatRoomUser.find_or_create_by(
			chat_room_id: chat_room.id,
			user_id: event.user_id,
		)

		if participate.save
			render json: { participate: participate }, status: :ok
		else
			render json: { participate: participate.errors }, status: :internal_server_error
		end
	end

	private

		def participates_params
			params.permit(:event_id, :user_id)
		end
end
