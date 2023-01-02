class Api::V1::RelationshipsController < ApplicationController
  def create
    user = User.find(relationship_params[:follower_id])
    user.follow(relationship_params[:followed_id])
    head 200
  end

  def destroy
    current_api_v1_user.unfollow(params[:user_id])
    head 200
  end

  def followings
    user = User.find(params[:user_id])
    users = user.followings
    render json: { users: users }, status: :ok
  end

  def followers
    user = User.find(params[:user_id])
    users = user.followers
    render json: { users: users }, status: :ok
  end

  def relationship_params
    params.require(:relationship).permit(:follower_id, :followed_id)
  end
end
