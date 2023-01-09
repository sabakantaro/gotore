class Api::V1::CommentsController < ApplicationController
  def create
    Comment.create(comment_params)
    head 200
  end

  def destroy
    Comment.find(params[:id]).destroy
    head 200
  end

  private
  def comment_params
    params.require(:comment).permit(:user_id, :content, :event_id)
  end
end
