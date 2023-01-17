const FOREX_RATE = 3.37
const MOCK_FAILED_ANYSTATUS_CODE = 500
const MOCK_API_WRONG = 401
const MOCK_API_LIMIT = 429
const MOCK_JSON_RESP = {rates: {'MYR': FOREX_RATE} }

import { getUSDMYRForexRate } from '../lib/forexrate.js'

test("Returns the correct forex rate", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));

  expect(await getUSDMYRForexRate()).toBe(FOREX_RATE);
});

test("Returns the error statement if fail to retrieve data", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_FAILED_ANYSTATUS_CODE,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  
  expect(await getUSDMYRForexRate()).toBe('Error: Failed to retrieve data');
});

test("Returns the error statement if API key is wrong", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_API_WRONG,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  
  expect(await getUSDMYRForexRate()).toBe('Error: Please check your API Credential');
});


test("Returns the error statement if API reached limit", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_API_LIMIT,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  
  expect(await getUSDMYRForexRate()).toBe('Error: Please check your API Daily/Monthly Limit');
});




