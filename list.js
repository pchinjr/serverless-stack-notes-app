import * as dynamoDblib from "./libs/dynamodb-lib";
import { succcess, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: "notes",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            "userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoDblib.call("query", params);
        callback(null, success(result.Items));
    } catch(e) {
        callback(null, failure({ status: false }));
    }
}