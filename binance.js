import Binance from 'node-binance-api'
const binance = new Binance()

export async function getBinanceUSDPrice(coinTicker) {
    let ticker = await binance.prices()
    return Number(ticker[`${coinTicker}BUSD`])
}