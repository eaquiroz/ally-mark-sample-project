# Ally Mark - lambda terraform project

## Installation steps (Ubuntu)
## (Terminal 1)
`sudo apt install docker.io`
`sudo apt install docker-compose`

`sudo apt install unzip`
`sudo apt install python-pip`
`wget https://releases.hashicorp.com/terraform/0.12.28/terraform_0.12.28_openbsd_amd64.zip`
`unzip terraform_0.12.28_openbsd_amd64.zip`
`cp ./terraform /usr/local/bin`
`pip install awscli-local`

## (Terminal 2)
`cd /Documents/lambda-proj`
`sudo docker-compose up`

## (Terminal 1 - When Terminal2's docker-compose output shows ready)
`awslocal dynamodb create-table --table-name counterTable --attribute-definitions `AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10`

`cd /Documents/lambda-proj`
`terraform init`
`terraform apply`
