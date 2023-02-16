require 'rails_helper'

RSpec.describe Notification, :type => :model do
  subject {
            described_class.new(
              user_id: 1,
              content: "content",
              image_url: nil,
              link_url: "/",
              is_checked: true,
            )
          }

  describe "Validations" do
    it "is invalid without user" do
      expect(subject).to_not be_valid
    end
  end
end