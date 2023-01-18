export async function getLunoTokenMYRPrice(ticker) {
    if (ticker === 'BTC') {
        ticker = 'XBT'
    }

    try {
        const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
        if (data.status !== 200) {
            throw new Error('Failed to retrieve price') 
        } else {
            const result = await data.json()
            let fetchStatus = true
            return  [fetchStatus, +((result.asks[0].price))]
        }
    } catch (error) {
        let fetchStatus = false
        if (error.toString() === 'TypeError: fetch failed') {
            let newError = 'Failed to retrieve price'
            return [fetchStatus, newError]
        }
        return [fetchStatus, error.toString()]
    }      
}
    // https://www.branch.io/glossary/query-parameters/

    