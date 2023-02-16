class SendNotificationToParticipantJob < ApplicationJob
  include NotificationConcern
  queue_as :default

  def perform(perticipant_id, event_id)
    event = Event.find(event_id)
    already_evaluated = UsersEvaluation.where(evaluated_id: event.user&.id, evaluator_id: perticipant_id).present?
    return if event.blank? || event.user.blank? || already_evaluated

		send_notification(
			perticipant_id,
			"Did you enjoyed #{event.title}? Please evaluate #{event.user.name} who organized the event! Your evaluation could help the event organizer!",
			event.user.image.url,
			"users/#{event.user_id}/evaluation",
		)
  end
end
