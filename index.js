import * as env from 'dotenv'
env.config()
import { getUserPrompt } from './userprompt.js'
import {getLunoTokenMYRPrice} from './luno.js'
import {getUSDMYRForexRate} from './forexrate.js'
import { getBinanceUSDPrice }from './binance.js'

function leftFillNum(num, targetLength) {
    return num.toString().padEnd(targetLength, ' ');
}

async function getLunoTokenUSDPrice(tokenMYR, rate) {
    return tokenMYR / rate
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

async function obtainPrice(userPrompt) {
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
}

async function loopFetchPrice(userPrompt) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function loop() {
      for (let i = 1; i < 4; i++) {
          console.log(`Loop ${i}st time...`);
                await obtainPrice(userPrompt)
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