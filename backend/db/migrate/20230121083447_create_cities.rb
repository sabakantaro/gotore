class CreateCities < ActiveRecord::Migration[7.0]
  def change
    create_table :cities do |t|
      t.string :name
      t.integer :province_id, null: false, default: 0, index: true

      t.timestamps
    end
  end
end
