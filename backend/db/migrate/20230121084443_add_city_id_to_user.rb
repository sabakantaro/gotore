class AddCityIdToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :city_id, :integer, null: false, default: 0
    add_column :users, :birth_date, :date
  end
end
