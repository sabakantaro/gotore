class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :user_id, null: false, default: 0
      t.integer :event_id, null: false, default: 0

      t.timestamps
    end
  end
end
