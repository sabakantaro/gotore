class Relationship < ApplicationRecord
  belongs_to :follower, class_name: "User", optional: true
  belongs_to :followed, class_name: "User", optional: true
end
