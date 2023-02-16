require 'rails_helper'

RSpec.describe ChatRoomUser, :type => :model do
  subject {
            described_class.new(
              chat_room_id: 1,
              user_id: 1,
            )
          }

  describe "Validations" do
    it "is invalid without related attributes" do
      User.new(id: 1).delete
      ChatRoom.new(id: 1).delete
      expect(subject).to_not be_valid
    end
  end
end