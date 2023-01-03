class Api::V1::EvaluationsController < ApplicationController
  def create
    return head 403 if UsersEvaluation.where(evaluated_id: params[:evaluated_id], evaluator_id: params[:user_id]).present?
    user = User.find(params[:user_id])
    user.evaluate(params[:evaluated_id], params[:score])
    head 200
  end
end
