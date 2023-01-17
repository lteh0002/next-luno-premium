import { getBinanceUSDPrice } from '../binance.js'
let TOKEN = 'BTC'
beforeEach(() => {
  jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

let MOCK_TOKEN = {'BTCBUSD': 20000}

jest.mock('node-binance-api', () => {
    return class Binance {
      prices() {
        // return NaN
        return new Promise((resolve, reject) => {
          resolve(MOCK_TOKEN)
          reject(undefined);
        })
      }
    }
  })
  
  test("Returns Message for Failed Binance Response", async () => {
    expect(await getBinanceUSDPrice(TOKEN)).toBe(MOCK_TOKEN.BTCBUSD);
  });

