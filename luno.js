export async function getLunoTokenMYRPrice(ticker) {
    if (ticker === 'BTC') {
        ticker = 'XBT'
    }
    const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
    const result = await data.json()
    // return ((result.asks[0].price)).toFixed()
    return +(result.last_trade)
    // https://www.branch.io/glossary/query-parameters/
}