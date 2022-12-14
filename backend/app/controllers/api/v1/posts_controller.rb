class Api::V1::PostsController < ApplicationController
	before_action :set_post, only: [:show, :update, :destroy, :upload_image]

	def index
		posts = Post.order(meeting_datetime: :desc).as_json(methods: :image_url)
		render json: { posts: posts }, status: :ok
	end

	def show
		render json: { post: @post.as_json(methods: :image_url) }, status: :ok
	end

	def create
		post = Post.new(post_params)
		if post.save
			render json: { post: post }, status: :ok
		else
			render json: { post: post.errors }, status: :internal_server_error
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
			render json: { post: @post.errors }, status: :internal_server_error
		end
	end

	private

	def set_post
		@post = Post.find_by(id: params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :body, :place, :meeting_datetime, :category_id, :post_image, :user_id)
	end
end

