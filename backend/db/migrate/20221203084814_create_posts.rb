class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.string :place
      t.datetime :meeting_datetime
      t.integer :user_id
      t.integer :category_id
      t.string :post_image

      t.timestamps
    end
  end
end
