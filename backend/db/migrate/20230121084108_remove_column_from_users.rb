class RemoveColumnFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :nickname
    remove_column :users, :birthday
    remove_column :users, :prefecture
    remove_column :users, :province_id
  end
end
