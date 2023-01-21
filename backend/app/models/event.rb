class Event < ApplicationRecord
	include EventSearchable

	has_one :participates
	has_many :events_favorites, dependent: :destroy
	has_many :comments, dependent: :destroy
	belongs_to :user, optional: true
	belongs_to :category, optional: true
	mount_uploader :image, ImageUploader

	scope :search_results, ->(province_id, keyword, datetime) do
		# where(province_id: province_id) # If the number of data increaced, use this.
		order(meeting_datetime: :desc)
			.search_by_datetime(datetime)
			.search_by_keyword(keyword)
	end

	scope :search_by_keyword, ->(keyword) do
    return where(nil) if keyword.blank?
		search(keyword).records.to_a
  end

	scope :search_by_datetime, ->(datetime) do
    return where(nil) if datetime.blank?
    where('events.meeting_datetime >= ?', datetime.to_date.beginning_of_day)
      .where('events.meeting_datetime <= ?', datetime.to_date.end_of_day)
  end

	def image_url
		image.thumb.url
	end
end
