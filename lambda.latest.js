'use strict';

var aws = require('aws-sdk');
aws.config.update({accessKeyId:"foobar", secretAccessKey: "foobar", region: "us-east-1"})
var documentClient = new aws.DynamoDB.DocumentClient({endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4569`});

exports.handler = async (event) => {
    try {
	var getParams = {
		TableName: "counterTable"
	}
	var data  = await documentClient.scan(getParams).promise();
	if(data.Items.length > 0) {
		var id = 1;
		var counter = data.Items[0].countNumber + 1;
		var putParams = {
			TableName: "counterTable",
			Key: {id: "1"},
			UpdateExpression: "set countNumber = :c",
			ExpressionAttributeValues: {
				":c": counter
			},
			ReturnValues: "UPDATED_NEW"
		}
		var updated = await documentClient.update(putParams).promise();
		const response = {
				statusCode: 200,
				body: JSON.stringify({
					count: counter
				})
			};
		return response;
	}
	else {
		var id = "1";
		var countNumber = 1;
		var putParams = {
			TableName: "counterTable",
			Item: {
				"id": id,
				"countNumber": countNumber
			}
		}
		var newAdded = await documentClient.put(putParams).promise();
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				count: 1
			})
		};
		return response;
	}
    }
    catch(e) {
	const response = {statusCode: 503, error: e}
	return response;
    }
}