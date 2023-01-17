import { printStatement } from "./printresult.js"
import { getLunoTokenMYRPrice } from './luno.js'
import { getUSDMYRForexRate } from './forexrate.js'
import { getBinanceUSDPrice }from './binance.js'
import { getLunoTokenUSDPrice } from './getlunousd.js'
import { getPriceDifference, getPricePremium } from './pricecalc.js'

export async function obtainPrice(userPrompt) {
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

