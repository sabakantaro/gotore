class Api::V1::EventsController < ApplicationController
	before_action :set_event, only: [:show, :update, :destroy]

	def index
		events = Event.search_results(api_v1_user_signed_in? ? current_api_v1_user.city_id : nil, params[:keyword], params[:datetime])
		render json: { events: events.as_json() }, status: :ok
	end

	def show
		render json: { event: @event.as_json(), comments: @event.comments.as_json() }, status: :ok
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

	def event_params
		params.require(:event).permit(:title, :body, :address, :meeting_datetime, :category_id, :image, :user_id)
	end
end

