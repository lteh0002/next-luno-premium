const FOREX_RATE = 3.37
const MOCK_STATUS_CODE = 500
const MOCK_JSON_RESP = {rates: {'MYR': FOREX_RATE} }

import { getUSDMYRForexRate } from '../forexrate.js'

test("Returns the correct forex rate", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));

  expect(await getUSDMYRForexRate()).toBe(FOREX_RATE);
});

test("Returns the correct forex rate", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_STATUS_CODE,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  
  expect(await getUSDMYRForexRate()).toBe('Failed to retrieve data');
});




