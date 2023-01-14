class Api::V1::CategoriesController < ApplicationController
	def index
		render json: { categories: Category.all.as_json() }, status: :ok
	end
end

