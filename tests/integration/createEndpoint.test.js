const api = require('../../src/create');

/**
 * This is the preliminary test using callback from Node 6 and old Serverless
 */
test('Trying to create a city with a json that wont be able to be parsed', async () => {
  const event = {};
  // sending the body without stringify will be a valid code
  // but the backend site won't be able to parse the body as json
  event.body = {
    latitude: -9.82,
    longitude: -66.88,
    name: 'TestCity',
    state: 'TC',
  };
  // call the method directly, not the API as a web client
  const response = await api.create(event);
  expect(response.statusCode).toEqual(400);
  expect(typeof response.body).toBe('string');
});

/**
 * This is the preliminary test using callback from Node 6 and old Serverless
 */

test('Trying to create a city with a valid json', async () => {
  const event = {};
  const mockCity = {
    latitude: -9.82,
    longitude: -66.88,
    name: 'TestCity',
    state: 'TC',
  };
  event.body = JSON.stringify(mockCity);
  // call the method directly, not the API as a web client
  const response = await api.create(event);
  expect(response.statusCode).toEqual(200);
});
