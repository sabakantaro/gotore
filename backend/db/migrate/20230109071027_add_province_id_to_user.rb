class AddProvinceIdToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :province_id, :integer, null: false, default: 0, after: :prefecture
  end
end
