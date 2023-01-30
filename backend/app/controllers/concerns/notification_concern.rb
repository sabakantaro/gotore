module NotificationConcern
  extend ActiveSupport::Concern

  def send_notification(user_id, content, image_url, link_url)
    Notification.create(
      user_id: user_id,
      content: content,
      image_url: image_url,
      link_url: link_url,
      is_checked: false,
    )
  end
end