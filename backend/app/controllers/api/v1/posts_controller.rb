class Api::V1::PostsController < ApplicationController
	before_action :set_post, only: [:show, :update, :destroy]

	def index
		posts = Post.order(created_at: :desc)
		render json: { posts: posts }, status: :ok
	end

	def show
		render json: { post: @post }, status: :ok
	end

	def create
		post = Post.new(post_params)
		post.user_id = current_api_v1_user.id
		if post.save
			render json: { post: post }, status: :ok
		else
			render json: { post: post.errors }, status: :ok
		end
	end

	def destroy
		@post.destroy
		render json: { post: @post }, status: :ok
	end

	def update
		if @post.update(post_params)
			render json: { post: @post }, status: :ok
		else
			render json: { post: @post.errors }, status: :ok
		end
	end

	private

	def set_post
		@post = Post.find_by(id: params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :body, :place, :meeting_datetime, :category_id)
	end
end

