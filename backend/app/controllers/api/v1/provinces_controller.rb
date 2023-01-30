class Api::V1::ProvincesController < ApplicationController
	def index
		render json: { provinces: Province.all.as_json() }, status: :ok
	end
end

