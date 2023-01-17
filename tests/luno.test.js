const ASK_PRICE = 99
const MOCK_STATUS_CODE = 500
const MOCK_JSON_RESP = { asks: [{"price": ASK_PRICE}] }

import { getLunoTokenMYRPrice } from '../luno.js'

test("Returns the correct ask price for Luno", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
  }));
  expect(await getLunoTokenMYRPrice()).toBe(ASK_PRICE);
});

test("Returns Message for failed Luno Response", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_STATUS_CODE,
    json: () => { }
  }));
  expect(await getLunoTokenMYRPrice()).toBe("Failed to retrieve price");
});