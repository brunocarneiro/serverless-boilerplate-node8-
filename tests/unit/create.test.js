const api = require('../../src/create');
const AWS = require('aws-sdk-mock');

AWS.mock('DynamoDB', 'putItem', (params) => {
  return {
    statusCode: 200,
  };
});

describe('City Unit Tests', () => {
  it('Should try to create a city with a json that wont be able to be parsed and fail', async (done) => {
    const event = {};
    // sending the body without stringify will be a valid code
    // but the backend site won't be able to parse the body as json
    event.body = {
      latitude: -9.82, longitude: -66.88, name: 'TestCity', state: 'TC',
    };
    // call the method directly, not the API as a web client
    const response = await api.create(event);
    expect(response.statusCode).toEqual(400);
    expect(typeof response.body).toBe('string');
    done();
  });

  it('Should try to create a city with a valid json', async (done) => {
    const event = {};
    const mockCity = {
      latitude: -9.82, longitude: -66.88, name: 'TestCity', state: 'TC',
    };
    event.body = JSON.stringify(mockCity);
    // call the method directly, not the API as a web client
    const response = await api.create(event);
    expect(response.statusCode).toEqual(200);
    done();
  });

  it('Should try to create a city without one of the required parameters', async (done) => {
    const event = {};
    const mockCity = {
      latitude: -9.82, longitude: -66.88, name: 'TestCity',
    };
    event.body = JSON.stringify(mockCity);
    // call the method directly, not the API as a web client
    const response = await api.create(event);
    expect(response.statusCode).toEqual(400);
    done();
  });
});
