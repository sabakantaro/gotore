class UsersEvaluation < ApplicationRecord
  belongs_to :evaluator, class_name: "User", optional: true
  belongs_to :evaluated, class_name: "User", optional: true
end
