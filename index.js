const Binance = require('node-binance-api');
require('dotenv').config()

const binance = new Binance()

async function getLunoBTCPrice() {
    const data = await fetch('https://api.luno.com/api/1/orderbook_top?pair=XBTMYR')
    const result = await data.json()
    let MYRprice = Number((result.asks[0].price)).toFixed()
    console.log(`BTCMYR price on Luno: MYR ${MYRprice}`)
    let USDprice = await getBTCUSDPrice(MYRprice)
    return USDprice
    // https://www.branch.io/glossary/query-parameters/
}

async function getBTCUSDPrice(price) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.YOUR_API);

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    let data = await fetch(`https://api.apilayer.com/fixer/convert?to=USD&from=MYR&amount=${price}`, requestOptions)
    let convertData = await data.json()
    priceConversion(price, convertData.result)
    return Number(convertData.result)
}

async function priceConversion(MYprice, lunoPrice) {
    console.log(`USDMYR: ${MYprice/(lunoPrice)}`)
    console.log(`BTCUSD price on Luno: ${lunoPrice}`)
}

async function getBinanceBTCPrice() {
    let ticker = await binance.prices()
    console.info("BTCUSD price on Binance: ", ticker.BTCBUSD);
    return Number(ticker.BTCBUSD)
}

async function getPriceDiff(lunoPrice, binancePrice) {
    let priceDiff = Number(lunoPrice - binancePrice)
    let diffPercentage = (priceDiff/lunoPrice) * 100
    console.log(`Price difference: ${priceDiff}`)
    console.log(`Luno Premium: ${diffPercentage} %`)
}

async function getPrice() {
    let lunoPrice = await getLunoBTCPrice()
    let binancePrice = await getBinanceBTCPrice()
    await getPriceDiff(lunoPrice, binancePrice)
}

getPrice()
