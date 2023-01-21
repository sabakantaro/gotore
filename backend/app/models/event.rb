class Event < ApplicationRecord
	include EventSearchable

	has_one :participates
	has_many :events_favorites, dependent: :destroy
	has_many :comments, dependent: :destroy
	belongs_to :user, optional: true
	belongs_to :category, optional: true
	mount_uploader :image, ImageUploader

	scope :search_results, ->(city_id, keyword, datetime) do
		search_by_datetime(datetime)
			.order_by_city(city_id)
			.search_by_keyword(keyword)
	end

	scope :order_by_city, ->(city_id) do
		return order(meeting_datetime: :desc) if city_id.blank?
		order(Arel.sql("events.city_id IN ('#{city_id}') DESC, events.meeting_datetime DESC"))
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

	def as_json(options = {})
		super(
			methods: %i[image_url],
			include: [
				user: {
					methods: %i[image_url],
				},
				category: {
					only: %i[id name]
				},
				events_favorites: {
					only: %i[id]
				},
			],
		)
	end

	def image_url
		image.thumb.url
	end
end
