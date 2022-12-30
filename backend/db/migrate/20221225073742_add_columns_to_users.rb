class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :gender, :integer, null: false, default: 0, after: :nickname
    add_column :users, :birthday, :date, after: :email
    add_column :users, :profile, :string, after: :birthday
    add_column :users, :prefecture, :integer, null: false, default: 0, after: :profile
  end
end
