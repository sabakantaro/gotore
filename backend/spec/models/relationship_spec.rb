require 'rails_helper'

RSpec.describe Relationship, :type => :model do
  subject {
            described_class.new(
              follower_id: 1,
              followed_id: 2,
            )
          }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end