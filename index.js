require('dotenv').config()

async function getBTCMYRPrice() {
    const data = await fetch('https://api.luno.com/api/1/orderbook_top?pair=XBTMYR')
    const result = await data.json()
    console.log(result.asks[0].price)
    // https://www.branch.io/glossary/query-parameters/
}

getBTCMYRPrice()
