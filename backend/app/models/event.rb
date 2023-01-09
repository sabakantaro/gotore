class Event < ApplicationRecord
	has_one :participates
	has_many :events_favorites, dependent: :destroy
	has_many :comments, dependent: :destroy
	belongs_to :user, optional: true
	belongs_to :category, optional: true
	mount_uploader :image, ImageUploader

	def image_url
		image.thumb.url
	end
end
