// const Binance = require('node-binance-api');
import Binance from 'node-binance-api'
// import env from 'dotenv'
import * as env from 'dotenv'
import prompt from 'prompt'
prompt.start()
env.config()

const binance = new Binance()

async function getUserPrompt() {
    let userInput = await prompt.get(['ticker']);
    let tokenTicker = (userInput.ticker).toUpperCase()
    let coin
    switch(tokenTicker) {
        case 'BTC':
            coin = 'XBT'
            break
        case 'ETH':
            coin = tokenTicker
            break
        case 'XRP':
            coin = tokenTicker
            break
        case 'LTC':
            coin = tokenTicker
            break
        default:
            console.log('Please only insert BTC, ETH, XRP or LTC')
            return getUserPrompt()
            
    }
    return coin
}

async function getLunoTokenPrice(ticker) {
    const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
    const result = await data.json()
    let MYRprice = Number((result.asks[0].price)).toFixed()
    console.log(`${ticker}MYR price on Luno: MYR ${MYRprice}`)
    let USDprice = await getTokenUSDPrice(MYRprice, ticker)
    return USDprice
    // https://www.branch.io/glossary/query-parameters/
}

async function getTokenUSDPrice(price, ticker) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.YOUR_API);

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    let data = await fetch(`https://api.apilayer.com/fixer/convert?to=USD&from=MYR&amount=${price}`, requestOptions)
    let convertData = await data.json()
    priceConversion(price, convertData.result, ticker)
    return Number(convertData.result)
}

async function priceConversion(MYprice, lunoPrice, ticker) {
    console.log(`USDMYR: ${MYprice/(lunoPrice)}`)
    console.log(`${ticker}USD price on Luno: ${lunoPrice}`)
}

async function getBinancePrice(coinTicker) {
    let ticker = await binance.prices()
    if (coinTicker === 'XBT') {
        coinTicker = 'BTC'
    }
    console.info(`${coinTicker}USD price on Binance: `, ticker[`${coinTicker}BUSD`]);
    return Number(ticker[`${coinTicker}BUSD`])
}


async function getPriceDiff(lunoPrice, binancePrice) {
    let priceDiff = Number(lunoPrice - binancePrice)
    let diffPercentage = (priceDiff/lunoPrice) * 100
    console.log(`Price difference: ${priceDiff}`)
    console.log(`Luno Premium: ${diffPercentage} %`)
}

async function getPrice() {
    let userPrompt = await getUserPrompt()
    let lunoPrice = await getLunoTokenPrice(userPrompt)
    let binancePrice = await getBinancePrice(userPrompt)
    await getPriceDiff(lunoPrice, binancePrice)
}

getPrice()

