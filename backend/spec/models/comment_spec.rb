require 'rails_helper'

RSpec.describe Comment, :type => :model do
  subject {
            described_class.new(
              event_id: 1,
              user_id: 1,
              content: "content",
            )
          }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end