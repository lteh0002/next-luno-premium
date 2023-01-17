import * as env from 'dotenv'
env.config()
//importing all modules into index.js
import { getUserPrompt } from './lib/userprompt.js'
import { getLunoTokenMYRPrice } from './lib/luno.js'
import { getUSDMYRForexRate } from './lib/forexrate.js'
import { getBinanceUSDPrice }from './lib/binance.js'
import { getLunoTokenUSDPrice } from './lib/getlunousd.js'
import { getPriceDifference } from './lib/pricediff.js'
import { getPricePremium } from './lib/pricepremium.js'

//Function to justify final outcome of console.log of the results
function leftFillNum(num, targetLength) {
    return num.toString().padEnd(targetLength, ' ');
}

//Function for printing results
async function printStatement(userPrompt, tokenLunoMYR, USDMYR, tokenBinanceUSD, tokenLunoUSD,tokenPriceDiff, tokenPremium) {
    console.log(leftFillNum(`${userPrompt}MYR price on Luno: `, 26) + `MYR ${tokenLunoMYR}`)
    console.log(leftFillNum(`USDMYR: `, 26) + `${USDMYR}`)
    console.log(leftFillNum(`${userPrompt}USD price on Luno: `, 26) + tokenLunoUSD)
    console.info(`${userPrompt}USD price on Binance: `, + tokenBinanceUSD);
    console.log(leftFillNum(`Price difference: `, 26) + tokenPriceDiff)
    console.log(leftFillNum(`Luno Premium: `, 26) + `${tokenPremium} %`)
}

//Function for the whole flow of the code
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

//Looping final results of Luno Premium every 3 seconds
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

//Integrating all code to obtain results
async function getTokenPrice() {
    let userPrompt = await getUserPrompt()
    let loopPrice = await loopFetchPrice(userPrompt)
}

getTokenPrice()