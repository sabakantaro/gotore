require 'rails_helper'

RSpec.describe Participate, :type => :model do
  subject {
            described_class.new(
              event_id: 1,
              user_id: 1,
            )
          }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end