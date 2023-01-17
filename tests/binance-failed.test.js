beforeEach(() => {
  jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

import { getBinanceUSDPrice } from '../binance.js'
// let MOCK_TOKEN = {'BTCUSD': 20000}

jest.mock('node-binance-api', () => {
    return class Binance {
      prices() {
        return new Promise((reject) => {
          reject(undefined);
        })
      }
    }
  })
  
  test("Returns Message for Failed Binance Response", async () => {
    expect(await getBinanceUSDPrice()).toBe("Failed to retrieve price");
  });

