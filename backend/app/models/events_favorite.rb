class EventsFavorite < ApplicationRecord
  belongs_to :event, optional: :true
end
