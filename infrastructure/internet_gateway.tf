resource "aws_internet_gateway" "gotore_igw" {
  vpc_id = "${aws_vpc.gotore_vpc.id}"

  tags = {
    Name = "${var.r_prefix}-igw"
  }
}