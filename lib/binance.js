import Binance from 'node-binance-api'

const binance = new Binance()

export const getBinanceUSDPrice = async (coinTicker) => {
  try {
    const ticker = await binance.prices()
    const price = ticker[`${coinTicker}BUSD`]
    if (!price) { //if price returns falsy value (e.g undefined), !price returns true
      throw new Error("Coin ticker not found or no price available")
    }
    // console.log([true, +price])
    return [true, +price]
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
        return [false, "Error: Failed to retrieve price due to connection error"]
    } else {
        return [false, error.message]
    }
  }
}