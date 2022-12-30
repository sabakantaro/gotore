class Api::V1::EventsController < ApplicationController
	before_action :set_event, only: [:show, :update, :destroy]

	def index
		events = Event.order(meeting_datetime: :desc)
		render json: { events: event_to_json(events) }, status: :ok
	end

	def show
		render json: { event: @event.as_json(methods: :image_url, include: [:user, :category]) }, status: :ok
	end

	def create
		event = Event.new(event_params)
		if event.save
			render json: { event: event }, status: :ok
		else
			render json: { event: event.errors }, status: :internal_server_error
		end
	end

	def destroy
		@event.destroy
		render json: { event: @event }, status: :ok
	end

	def update
		if @event.update(event_params)
			render json: { event: @event }, status: :ok
		else
			render json: { event: @event.errors }, status: :internal_server_error
		end
	end

	private

	def set_event
		@event = Event.find_by(id: params[:id])
	end

	def event_to_json(events)
		events.as_json(
			methods: %i[image_url],
			include: [
				user: {
					methods: [:image_url],
				},
			],
		)
	end

	def event_params
		params.require(:event).permit(:title, :body, :place, :meeting_datetime, :category_id, :image, :user_id)
	end
end

