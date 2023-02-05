require 'rails_helper'

RSpec.describe ChatRoom, :type => :model do
  subject { described_class.new }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
  end
end