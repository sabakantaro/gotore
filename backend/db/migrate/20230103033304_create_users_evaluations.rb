class CreateUsersEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :users_evaluations do |t|
      t.integer :evaluated_id
      t.integer :evaluator_id
      t.float :evaluation

      t.timestamps
    end
  end
end
