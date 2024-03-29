class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :chat_room_id, null: false
      t.integer :user_id, null: false
      t.string :content, null: false

      t.timestamps
    end
  end
end
