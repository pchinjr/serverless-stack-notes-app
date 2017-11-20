import uuid from "uuid";
import * as dynamoDblib from "./libs/dynamodb-lib";
import { sucess, failure, success } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime()
        }
    };

    try {
        await dynamoDblib.call("put", params);
        callback(null, success(params.Item));
    } catch(e) {
        callback(null, failure({ status: false}));
    }
}