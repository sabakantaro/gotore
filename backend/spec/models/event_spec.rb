require 'rails_helper'

RSpec.describe Event, :type => :model do
  subject {
            described_class.new(
              title: "title",
              body: "body",
              address: "address",
              meeting_datetime: "2023-3-23",
              category_id: 1,
              city_id: 1,
              image: nil,
              user_id: 1
            )
          }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end