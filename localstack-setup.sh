#!/bin/sh
echo "Initializing LocalStack S3 and other resources..."

awslocal dynamodb create-table \
    --table-name users \
    --attribute-definitions AttributeName=id,AttributeType=S AttributeName=type,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH AttributeName=type,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST
