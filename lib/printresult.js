import { leftFillNum } from './padding.js'

export async function printStatement(userPrompt, tokenLunoMYR, USDMYR, tokenBinanceUSD, tokenLunoUSD,tokenPriceDiff, tokenPremium) {
    console.log(leftFillNum(`${userPrompt}MYR price on Luno: `, 26) + `MYR ${tokenLunoMYR}`)
    console.log(leftFillNum(`USDMYR: `, 26) + `${USDMYR}`)
    console.log(leftFillNum(`${userPrompt}USD price on Luno: `, 26) + tokenLunoUSD)
    console.info(`${userPrompt}USD price on Binance: `, + tokenBinanceUSD);
    console.log(leftFillNum(`Price difference: `, 26) + tokenPriceDiff)
    console.log(leftFillNum(`Luno Premium: `, 26) + `${tokenPremium} %`)
}