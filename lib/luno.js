export async function getLunoTokenMYRPrice(ticker) {
    if (ticker === 'BTC') {
        ticker = 'XBT'
    }

    try {
        const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
        //if status code not in the range 200-299, return true. 
        if (!data.ok) { 
            throw new Error('Failed to retrieve price') 
        } else {
            const result = await data.json()
            return  [true, +((result.asks[0].price))]
        }
    } catch (error) {
        if (error.toString() === 'TypeError: fetch failed') {
            return [false, 'Failed to retrieve price']
        } else {
            return [false, error.toString()]
        }
    }      
}
    // https://www.branch.io/glossary/query-parameters/

    