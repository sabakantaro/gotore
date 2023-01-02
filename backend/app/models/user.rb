# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :events
  has_many :participates
  has_many :chat_room_users
  has_many :chat_rooms, through: :chat_room_users
  has_many :messages
  has_many :notifications
  has_many :relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followings, through: :relationships, source: :followed
  has_many :followers, through: :reverse_of_relationships, source: :follower
  mount_uploader :image, ImageUploader

  def image_url
    image.thumb.url
  end

  def my_favorite_event_ids
    EventsFavorite.where(user_id: id).pluck(:event_id)
  end

  def my_favorite_events
    Event.where(id: my_favorite_event_ids)
  end

  def my_notifications_count
    Notification.where(user_id: id, is_checked: false).count
  end

  def follow(user_id)
    relationships.create(followed_id: user_id)
  end

  def unfollow(user_id)
    relationships.find_by(followed_id: user_id).destroy
  end

  def following?(user)
    followings.include?(user)
  end

  def followers_count
    self.followers.count
  end

  def followings_count
    self.followings.count
  end

  def update_without_current_password(params, *options)
    params.delete(:current_password)

    if params[:password].blank? && params[:password_confirmation].blank?
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end
end
