class Api::V1::ParticipatesController < ApplicationController
	include NotificationConcern
	def create
		participate = Participate.create(participates_params)
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

		send_notification(
			participate.user_id,
			"#{current_api_v1_user.name} participated in #{event.title}! Start to chat!",
			event.user.image.url
			"/chatroom/#{participate.user_id}",
		)

		SendNotificationToParticipantJob.set(2.hours.after(event.meeting_datetime)).perform_later(participate.user_id, event.id)
	end

	private

		def participates_params
			params.permit(:event_id, :user_id)
		end
end
