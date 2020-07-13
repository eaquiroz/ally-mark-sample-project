variable "aws_region" {
  default = "us-east-1"
}

provider "aws" {
  region          = "${var.aws_region}"
  access_key = "foobar"
  secret_key = "foobar"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  endpoints {
    apigateway     = "http://localhost:4567"
    dynamodb       = "http://localhost:4569"
    iam            = "http://localhost:4593"
    lambda         = "http://localhost:4574"
  }
}

data "archive_file" "lambda_zip" {
    type          = "zip"
    source_file   = "lambda.js"
    output_path   = "lambda.zip"
}

resource "aws_lambda_function" "counterApi" {
  filename         = "lambda.zip"
  function_name    = "counterApi"
  role             = "${aws_iam_role.iam_for_lambda_tf.arn}"
  handler          = "lambda.handler"
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
  runtime          = "nodejs8.10"
}

resource "aws_iam_role" "iam_for_lambda_tf" {
  name = "iam_for_lambda_tf"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}