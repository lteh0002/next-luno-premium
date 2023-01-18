import Binance from 'node-binance-api'
const binance = new Binance()

export async function getBinanceUSDPrice(coinTicker) {   
        try {
            const ticker = await binance.prices()
            if (ticker[`${coinTicker}BUSD`] === undefined || ticker[`${coinTicker}BUSD`] === NaN) {
                throw new Error("Failed to retrieve price")
            } else {
                let fetchStatus = true
                return [fetchStatus, +(ticker[`${coinTicker}BUSD`])]
            }
        } catch(error) {
            if (error.toString() === 'Error: ETIMEDOUT') {
                let newError = "Error: Failed to retrieve price"
                let fetchStatus = false
                return([fetchStatus, newError.toString()])
            }
            let fetchStatus = false
            return [fetchStatus, error.toString()]
        }
}
