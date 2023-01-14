class AddProvinceIdToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :province_id, :integer, null: false, default: 0, after: :body
  end
end
