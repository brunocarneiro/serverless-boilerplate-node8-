const dynamodb = require('./dynamodb');

/**
 * An method for inserting cities in the database
 * @param event event.body should contain the json
 */
exports.create = async (event) => {
  const timestamp = new Date().getTime();
  try {
    const requestData = JSON.parse(event.body);
    // basic data type validation
    // TODO should we use JSON Schema?
    if (typeof requestData.name !== 'string' || typeof requestData.latitude !== 'number'
          || typeof requestData.longitude !== 'number' || typeof requestData.state !== 'string') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Please verify your json as the types for each property is no properly set',
      };
    }
    // TODO change to dynamoose
    // the json is good? data type fine?
    // lets build our dynamodb param
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        name: requestData.name,
        state: requestData.state,
        createdAt: timestamp, // basic auditing
        updatedAt: timestamp, // basic auditing
      },
    };
    // all set at basic auditing
    // lets make a request to dynamodb and insert our entity
    const dynamoPromise = dynamodb.put(params).promise();
    return await dynamoPromise.then((response) => {
      return {
        statusCode: 200,
      };
    });
  } catch (e) {
    // catching parsing errors on JSON for safe guarding
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t parse json body',
    };
  }
};
