beforeEach(() => {
    jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
  });

let TOKEN = 'BTC'
  
test("Returns price if Binance request succeeds", async () => {
  const getBinancePrice = require('../binance.js').getBinanceUSDPrice // your function name could be different

  // mocking the entire node-binance-api module
  jest.mock('node-binance-api', () => {
    return class Binance {
      // we use only the prices method for this particular test, so we'll mock just this method
      prices() {
        return new Promise(res => {
          res({
            BTCBUSD: 9
          })
        })
      }
    }
  })
    expect(await getBinancePrice(TOKEN)).toBe(9);
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