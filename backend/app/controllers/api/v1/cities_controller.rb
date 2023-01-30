class Api::V1::CitiesController < ApplicationController
	def index
		render json: { cities: City.all.as_json() }, status: :ok
	end
end

