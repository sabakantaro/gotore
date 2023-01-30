class AddIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :city_id
    add_index :users, :birth_date
    add_index :events, :city_id
    add_index :events, :meeting_datetime
    add_index :events, :user_id
    add_index :events, :category_id
    add_index :events_favorites, :user_id
    add_index :events_favorites, :event_id
    add_index :chat_room_users, :user_id
    add_index :chat_room_users, :chat_room_id
    add_index :comments, :user_id
    add_index :comments, :event_id
    add_index :messages, :user_id
    add_index :messages, :chat_room_id
    add_index :notifications, :user_id
    add_index :participates, :user_id
    add_index :participates, :event_id
    add_index :relationships, :follower_id
    add_index :relationships, :followed_id
    add_index :users_evaluations, :evaluator_id
    add_index :users_evaluations, :evaluated_id
  end
end
