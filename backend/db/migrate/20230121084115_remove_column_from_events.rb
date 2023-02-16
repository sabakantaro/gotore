class RemoveColumnFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :province_id
    remove_column :events, :place
  end
end
