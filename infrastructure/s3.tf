resource "aws_s3_bucket" "gotore_alb_logs" {
  bucket = "${var.r_prefix}-20220212-alb-logs" # Add date to make it unique
}