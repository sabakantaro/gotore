class AddCityIdToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :city_id, :integer, null: false, default: 0
    add_column :events, :address, :text
  end
end
