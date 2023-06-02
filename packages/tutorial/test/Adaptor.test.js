import { expect } from 'chai';
import nock from 'nock';
import { getTodaysWeather } from '../src/Adaptor.js';

it('should get weather', async () => {
  const state = {
    configuration: {},
    data: {},
  };

  // const operation = getTodaysWeather();
  // const result = await operation(state);

  const result = await getTodaysWeather()(state);

  expect(result.data).to.exist;
});

// Wishlist
// expect('getTodaysWeather()', initialState, outputState);
// expect('getTodaysWeather()', initialState, () => {
//   assert();
// });
