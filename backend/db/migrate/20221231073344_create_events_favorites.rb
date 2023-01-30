class CreateEventsFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :events_favorites do |t|
      t.integer :user_id, null: false, default: 0
      t.integer :event_id, null: false, default: 0

      t.timestamps
    end
  end
end
