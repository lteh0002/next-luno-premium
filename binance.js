import Binance from 'node-binance-api'
const binance = new Binance()

export async function getBinanceUSDPrice(coinTicker) {   
        try {
            const ticker = await binance.prices()
            return Number(ticker[`${coinTicker}BUSD`])
        } catch(error) {
            return("Failed to retrieve price")
        }
}

getBinanceUSDPrice()