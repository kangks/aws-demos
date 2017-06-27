'use strict';

console.log('Loading function');

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const dynamo = new AWS.DynamoDB.DocumentClient();
// const ddb = AWSXRay.captureAWSClient(new AWS.DynamoDB());
// const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;
const createResponse = (statusCode, body) => {
    return {
        "statusCode": statusCode,
        "body": body || ""
    }
};

exports.get = (event, context, callback) => {
    var params = {
        "TableName": tableName,
        "Key": {
            id: event.pathParameters.resourceId
        }
    };

    console.log("params:", params)
    console.log("dynamo:", dynamo)

    dynamo.get(params, (err, data) => {
        var response;
        if (err){
          console.log("err:", err)
          response = createResponse(500, err);
        }else{
          response = createResponse(200, data.Item ? data.Item.doc : null);
        }
        callback(null, response);
    });
};

exports.put = (event, context, callback) => {
    var item = {
        "id": event.pathParameters.resourceId,
        "doc": event.body
    };

    var params = {
        "TableName": tableName,
        "Item": item
    };

    dynamo.put(params, (err, data) => {
        var response;
        if (err){
          console.log("err:", err)
          response = createResponse(500, err);
        }else
            response = createResponse(200, null);
        callback(null, response);
    });
};

exports.delete = (event, context, callback) => {

    var params = {
        "TableName": tableName,
        "Key": {
            "id": event.pathParameters.resourceId
        }
    };

    dynamo.delete(params, (err, data) => {
        var response;
        if (err){
            console.log("err:", err)
            response = createResponse(500, err);
        }else
            response = createResponse(200, null);
        callback(null, response);
    });
};
