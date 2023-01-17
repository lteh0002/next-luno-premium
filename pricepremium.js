export async function getPricePremium(priceDiff, tokenLunoUSD) {
    return (priceDiff / tokenLunoUSD) * 100
}