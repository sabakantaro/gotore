class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.text :content
      t.text :image_url
      t.string :link_url
      t.boolean :is_checked

      t.timestamps
    end
  end
end
