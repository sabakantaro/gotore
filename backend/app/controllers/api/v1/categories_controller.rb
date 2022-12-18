class Api::V1::CategoriesController < ApplicationController
	def index
		categories = Category.all.as_json()
		render json: { categories: categories }, status: :ok
	end
end

