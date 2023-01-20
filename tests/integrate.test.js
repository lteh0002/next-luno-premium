test("Shows premium in console if all good", async () => {
    const obtainPrice = require('../lib/obtainprice.js').obtainPrice

    const MOCK_USER_INPUT = "BTC"

  
    const MOCK_BINANCE_PRICE = [true, 99]
    jest.mock('../lib/binance.js', () => {
      return {
        getBinanceUSDPrice() {
          return new Promise(res => {
            res(MOCK_BINANCE_PRICE)
          })
        }
      }
    })
  
    const MOCK_LUNO_PRICE = [true, 450]
    jest.mock('../lib/luno.js', () => {
      return {
        getLunoTokenMYRPrice() {
          return new Promise(res => {
            res(MOCK_LUNO_PRICE)
          })
        }
      }
    })
  
    const MOCK_EXCHANGE_RATE = [true, 4.3]
    jest.mock('../lib/forexrate.js', () => {
      return {
        getUSDMYRForexRate() {
          return new Promise(res => {
            res(MOCK_EXCHANGE_RATE)
          })
        }
      }
    })


  
    const LUNO_USD_PRICE = +(MOCK_LUNO_PRICE[1] / MOCK_EXCHANGE_RATE[1])
    const PRICE_DIFF = LUNO_USD_PRICE - MOCK_BINANCE_PRICE[1]
    const PREMIUM = PRICE_DIFF / LUNO_USD_PRICE * 100
    console.log = jest.fn(() => undefined);
    await obtainPrice(MOCK_USER_INPUT)
    

    expect(console.log).toHaveBeenCalledWith(`${MOCK_USER_INPUT}MYR price on Luno:`.padEnd(26, ' ') + `MYR ${MOCK_LUNO_PRICE[1]}`);
  
    expect(console.log).toHaveBeenCalledWith("USDMYR:".padEnd(26, ' ') + `${MOCK_EXCHANGE_RATE[1]}`);
  
    expect(console.log).toHaveBeenCalledWith(`${MOCK_USER_INPUT}USD price on Luno:`.padEnd(26, ' ') + `${LUNO_USD_PRICE}`);
  
    expect(console.log).toHaveBeenCalledWith(`${MOCK_USER_INPUT}USD price on Binance:`.padEnd(26, ' ') + `USD ${MOCK_BINANCE_PRICE[1]}`);
  
    expect(console.log).toHaveBeenCalledWith("Price Difference: ".padEnd(26, ' ') + `USD ${PRICE_DIFF}`);
  
    expect(console.log).toHaveBeenCalledWith("Luno's Premium:".padEnd(26, ' ') + `${PREMIUM} %`);
  });