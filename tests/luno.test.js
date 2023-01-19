const ASK_PRICE = 99
const MOCK_STATUS_CODE = 500
const MOCK_JSON_RESP = { asks: [{"price": ASK_PRICE}] }

import { getLunoTokenMYRPrice } from '../lib/luno.js'

test("Returns the correct ask price for Luno", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  expect.assertions(1)
  expect(await getLunoTokenMYRPrice()).toEqual([true, ASK_PRICE]);
});

test("Returns Message for failed Luno Response", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_STATUS_CODE,
    json: () => { }
  }));
  expect.assertions(1)
  expect(await getLunoTokenMYRPrice()).toEqual([false, "Error: Failed to retrieve price"]);
});