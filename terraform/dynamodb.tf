resource "aws_dynamodb_table" "users" {
    name           = "users"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "id"
    range_key      = "type"

    attribute {
        name = "id"
        type = "S"
    }
    attribute {
        name = "type"
        type = "S"
    }
}