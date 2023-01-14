import Binance from 'node-binance-api'
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

    if (tokenTicker === 'BTC' || tokenTicker === 'ETH' || tokenTicker === 'XRP' || tokenTicker === 'LTC') {
        return tokenTicker
    } else {
        console.log('Please only insert BTC, ETH, XRP or LTC')
        return getUserPrompt()
    }
}

async function getLunoTokenMYRPrice(ticker) {
    if (ticker === 'BTC') {
        ticker = 'XBT'
    }
    const data = await fetch(`https://api.luno.com/api/1/orderbook_top?pair=${ticker}MYR`)
    const result = await data.json()
    return Number((result.asks[0].price)).toFixed()
    // console.log(leftFillNum(`${ticker}MYR price on Luno: `, 26) + `MYR ${MYRprice}`)
    // let USDprice = await getTokenUSDPrice(MYRprice, ticker)
    // return USDprice
    // https://www.branch.io/glossary/query-parameters/
}

async function getUSDMYRForexRate() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.YOUR_API);

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    let data = await fetch('https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD', requestOptions)
    let convertData = await data.json()
    return Number(convertData.rates['MYR'])
    // priceConversion(price, convertData.result, ticker)
    // return Number(convertData.rates[tokenMYR])
}

async function getLunoTokenUSDPrice(tokenMYR, rate) {
    return tokenMYR / rate
}

async function getBinanceUSDPrice(coinTicker) {
    let ticker = await binance.prices()
    return Number(ticker[`${coinTicker}BUSD`])
}

async function getPriceDifference(tokenLunoUSD, tokenBinanceUSD) {
    return tokenLunoUSD - tokenBinanceUSD
}

async function getPricePremium(priceDiff, tokenLunoUSD) {
    return (priceDiff / tokenLunoUSD) * 100
}

async function printStatement(userPrompt, tokenLunoMYR, USDMYR, tokenBinanceUSD, tokenLunoUSD,tokenPriceDiff, tokenPremium) {
    console.log(leftFillNum(`${userPrompt}MYR price on Luno: `, 26) + `MYR ${tokenLunoMYR}`)
    console.log(leftFillNum(`USDMYR: `, 26) + `${USDMYR}`)
    console.log(leftFillNum(`${userPrompt}USD price on Luno: `, 26) + tokenLunoUSD)
    console.info(`${userPrompt}USD price on Binance: `, + tokenBinanceUSD);
    console.log(leftFillNum(`Price difference: `, 26) + tokenPriceDiff)
    console.log(leftFillNum(`Luno Premium: `, 26) + `${tokenPremium} %`)
}

async function loopFetchPrice(userPrompt) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function loop() {
      for (let i = 1; i < 4; i++) {
          console.log(`Loop ${i}st time...`);
          const [tokenLunoMYR, USDMYR, tokenBinanceUSD] = await Promise.all([
            getLunoTokenMYRPrice(userPrompt), 
            getUSDMYRForexRate(), 
            getBinanceUSDPrice(userPrompt)
            ])
            let tokenLunoUSD = await getLunoTokenUSDPrice(tokenLunoMYR, USDMYR)
            let tokenPriceDiff = await getPriceDifference(tokenLunoUSD, tokenBinanceUSD)
            let tokenPremium = await getPricePremium(tokenPriceDiff, tokenLunoUSD)
            let print = printStatement(
                userPrompt, tokenLunoMYR, USDMYR, 
                tokenBinanceUSD, tokenLunoUSD,tokenPriceDiff, 
                tokenPremium)
                await sleep(3000);
            }
            console.log('Done');
    }
    loop();
}

async function getTokenPrice() {
    let userPrompt = await getUserPrompt()
    let loopPrice = await loopFetchPrice(userPrompt)
}

getTokenPrice()