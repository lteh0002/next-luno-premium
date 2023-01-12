const Binance = require('node-binance-api');
require('dotenv').config()

const binance = new Binance()

async function getLunoBTCPrice() {
    const data = await fetch('https://api.luno.com/api/1/orderbook_top?pair=XBTMYR')
    const result = await data.json()
    let MYRprice = Number((result.asks[0].price)).toFixed()
    console.log(`BTCMYR price on Luno: MYR ${MYRprice}`)
    let USDprice = await getBTCUSDPrice(MYRprice)
    // https://www.branch.io/glossary/query-parameters/
}

async function getBTCUSDPrice(price) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.YOUR_API);

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    let data = await fetch(`https://api.apilayer.com/fixer/convert?to=USD&from=MYR&amount=${price}`, requestOptions)
    let convertData = await data.json()
    let USDprice = convertData.result
    console.log(`USDMYR: ${price/(USDprice)}`)
    console.log(`BTCUSD price on Luno: ${USDprice}`)
}




async function getBinanceBTCPrice() {
    let btcprice = await binance.prices('BTCBUSD', (error, ticker) => {
        console.info("BTCUSD price on Binance: ", ticker.BTCBUSD);
      });
}

async function getPrice() {
    await getLunoBTCPrice()
    await getBinanceBTCPrice()
}

getPrice()
