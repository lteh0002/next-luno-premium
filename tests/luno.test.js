const ASK_PRICE = 99
const MOCK_JSON_RESP = { asks: [{"price": ASK_PRICE}] }

global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(MOCK_JSON_RESP)
}));

import { getLunoTokenMYRPrice } from '../luno.js'

test("Returns the correct sum value", async () => {
  expect(await getLunoTokenMYRPrice()).toBe(ASK_PRICE);
});
