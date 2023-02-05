require 'rails_helper'

RSpec.describe UsersEvaluation, :type => :model do
  subject {
            described_class.new(
              evaluator_id: 1,
              evaluated_id: 2,
            )
          }

  describe "Validations" do
    it "is valid with valid attributes" do
      User.new(id: 1)
      expect(subject).to be_valid
    end
  end
end