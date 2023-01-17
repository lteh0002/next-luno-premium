export async function getPriceDifference(tokenLunoUSD, tokenBinanceUSD) {
    return tokenLunoUSD - tokenBinanceUSD
}

export async function getPricePremium(priceDiff, tokenLunoUSD) {
    return (priceDiff / tokenLunoUSD) * 100
}