class Api::V1::ParticipatesController < ApplicationController
	def create
		participate = Participate.create(
			post_id: participates_params[:post_id],
			user_id: participates_params[:user_id],
		)

		chat_room = ChatRoom.create

		ChatRoomUser.find_or_create_by(
			chat_room_id: chat_room.id,
			user_id: participate.user_id,
		)

		post = Post.find_by(id: participate.post_id)
		ChatRoomUser.find_or_create_by(
			chat_room_id: chat_room.id,
			user_id: post.user_id,
		)

		if participate.save
			render json: { participate: participate }, status: :ok
		else
			render json: { participate: participate.errors }, status: :internal_server_error
		end
	end

	private

		def participates_params
			params.permit(:post_id, :user_id)
		end
end
