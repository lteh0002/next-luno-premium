beforeEach(() => {
    jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

test("Returns price if Binance request succeeds", async () => {
  const getBinancePrice = require('../lib/binance.js').getBinanceUSDPrice // your function name could be different
  let TOKEN = 'BTC'
  const test_number = 9
  // Mocking the entire node-binance-api module
  jest.mock('node-binance-api', () => {
    return class Binance {
      prices() {
        const ret = {}
        ret[`${TOKEN}BUSD`] = test_number

        return new Promise(res => {
          res(ret)
        })
      }
    }
  })
    expect(await getBinancePrice(TOKEN)).toBe(test_number);
});

test("Returns error if Binance fail to request a ticker", async () => {
  const getBinancePrice = require('../lib/binance.js').getBinanceUSDPrice // 
  let TOKEN = 'XXX'
  jest.mock('node-binance-api', () => {
    return class Binance {
      prices() {
        return new Promise(res => {
          res(NaN)
        })
      }
    }
  })
  expect(await getBinancePrice(TOKEN)).toBe("Error: Failed to retrieve price");
});