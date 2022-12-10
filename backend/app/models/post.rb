class Post < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :category, optional: true
  mount_uploader :post_image, ImageUploader

  def image_url
    image.thumb.url
  end
end