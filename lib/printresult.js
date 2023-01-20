import { leftFillNum } from './padding.js'

export async function printStatement(userPrompt, tokenLunoMYR, USDMYR, tokenBinanceUSD, tokenLunoUSD,tokenPriceDiff, tokenPremium) {
    console.log(leftFillNum(`${userPrompt}MYR price on Luno: `, 26) + `MYR ${tokenLunoMYR[1]}`) //[1] to access Luno MYR token price
    console.log(leftFillNum(`USDMYR: `, 26) + `${USDMYR[1]}`) //[1] to access currency rate
    console.log(leftFillNum(`${userPrompt}USD price on Luno: `, 26) + tokenLunoUSD)
    console.log(leftFillNum(`${userPrompt}USD price on Binance: `, 26) + `USD ${tokenBinanceUSD[1]}`)
    console.log(leftFillNum(`Price Difference: `, 26) + `USD ${tokenPriceDiff}`)
    console.log(leftFillNum(`Luno's Premium: `, 26) + `${tokenPremium} %`)
}