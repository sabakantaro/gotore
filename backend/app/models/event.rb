class Event < ApplicationRecord
	include EventSearchable

	has_one :participates
	has_many :events_favorites, dependent: :destroy
	has_many :comments, dependent: :destroy
	belongs_to :user, optional: true
	belongs_to :category, optional: true
	mount_uploader :image, ImageUploader

	scope :search_by_date, ->(date) do
    return where(nil) if date.blank?
    where('events.meeting_datetime >= ?', date.to_date.beginning_of_day)
      .where('events.meeting_datetime <= ?', date.to_date.end_of_day)
  end

	def image_url
		image.thumb.url
	end
end
