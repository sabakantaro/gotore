class Comment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :event, optional: true

	def as_json(options = {})
		super(
			include: [
				user: {
					only: %i[id name],
					methods: %i[image_url],
				},
			],
		)
	end
end
