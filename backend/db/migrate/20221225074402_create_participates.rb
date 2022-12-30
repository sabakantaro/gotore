class CreateParticipates < ActiveRecord::Migration[7.0]
  def change
    create_table :participates do |t|
      t.integer :user_id, null: false
      t.integer :event_id, null: false

      t.timestamps
    end
  end
end
