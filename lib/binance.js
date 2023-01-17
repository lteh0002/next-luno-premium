import Binance from 'node-binance-api'
const binance = new Binance()

export async function getBinanceUSDPrice(coinTicker) {   
        try {
            const ticker = await binance.prices()
            if (ticker[`${coinTicker}BUSD`] === undefined || ticker[`${coinTicker}BUSD`] === NaN) {
                throw new Error("Failed to retrieve price")
            } else {
                return +(ticker[`${coinTicker}BUSD`])
            }
        } catch(error) {
            return error.toString()
        }
}

getBinanceUSDPrice('PPP')