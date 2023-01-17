beforeEach(() => {
    jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});


test("Returns price if Binance request succeeds", async () => {
  const getBinancePrice = require('../binance.js').getBinanceUSDPrice // your function name could be different
  let TOKEN = 'BTC'
  const test_number = 9
  // mocking the entire node-binance-api module
  jest.mock('node-binance-api', () => {
    return class Binance {
      // we use only the prices method for this particular test, so we'll mock just this method
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

test("Returns error if Binance fail to request", async () => {
  const getBinancePrice = require('../binance.js').getBinanceUSDPrice // your function name could be different

  jest.mock('node-binance-api', () => {
    return class Binance {
      prices() {
        return new Promise(rej => {
          rej(undefined)
        })
      }
    }
  })
  expect(await getBinancePrice()).toBe("Failed to retrieve price");
});