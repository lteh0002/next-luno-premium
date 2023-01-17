import prompt from 'prompt'
prompt.start()

export async function getUserPrompt() {
    let userInput = await prompt.get(['ticker']);
    let tokenTicker = (userInput.ticker).toUpperCase()

    if (tokenTicker === 'BTC' || tokenTicker === 'ETH' || tokenTicker === 'XRP' || tokenTicker === 'LTC') {
        return tokenTicker
    } else {
        console.log('Please only insert BTC, ETH, XRP or LTC')
        return getUserPrompt()
    }
}