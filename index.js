// const Binance = require('node-binance-api');
import Binance from 'node-binance-api'
// import env from 'dotenv'
import * as env from 'dotenv'
import prompt from 'prompt'
prompt.start()
env.config()

const binance = new Binance()

function leftFillNum(num, targetLength) {
    return num.toString().padEnd(targetLength, ' ');
}

async function getUserPrompt() {
    let userInput = await prompt.get(['ticker']);
    let tokenTicker = (userInput.ticker).toUpperCase()
    let coin

    if (tokenTicker === 'XBT') {
        coin = 'XBT'
    } else if (tokenTicker === 'ETH' || tokenTicker === 'XRP' || tokenTicker === 'LTC') {
        coin = tokenTicker
    } else if (tokenTicker !== 'ETH' || tokenTicker !== 'XRP' || tokenTicker !== 'LTC'){
        console.log('Please only insert BTC, ETH, XRP or LTC')
        return getUserPrompt()
    }
    return coin
}

async function getLunoTokenPrice(ticker) {
    const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
    const result = await data.json()
    let MYRprice = Number((result.asks[0].price)).toFixed()
    console.log(leftFillNum(`${ticker}MYR price on Luno: `, 26) + `MYR ${MYRprice}`)
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
    console.log(leftFillNum(`USDMYR: `, 26) + `${MYprice/(lunoPrice)}`)
    console.log(leftFillNum(`${ticker}USD price on Luno: `, 26) + lunoPrice)
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
    console.log(leftFillNum(`Price difference: `, 26) + priceDiff)
    console.log(leftFillNum(`Luno Premium: `, 26) + `${diffPercentage} %`)
}

async function loopFetchPrice(lunoPrice, binancePrice, priceDiff, userInput) {
    let i = 3
    let loop = setInterval(async function() {
        await getPrice(lunoPrice, binancePrice, priceDiff, userInput)
        i--;
        if (i === 0) {
            clearInterval(loop)
        }
    }, 3000)
}

async function getPrice(lunoPrice, binancePrice, priceDiff, userInput) {
  let priceLuno = await lunoPrice(userInput);
  let priceBinance = await binancePrice(userInput);
  await priceDiff(priceLuno, priceBinance);
}

async function getTokenPrice() {
    let userPrompt = await getUserPrompt()
    let printPrice = await loopFetchPrice(getLunoTokenPrice, getBinancePrice, getPriceDiff, userPrompt)
}

getTokenPrice()

