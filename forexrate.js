export async function getUSDMYRForexRate() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.YOUR_API);

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    let data = await fetch('https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD', requestOptions)
    if (data.status !== 200) {
        return 'Failed to retrieve data'
    } else {
        let convertData = await data.json()
        return Number(convertData.rates['MYR'])
    }
    
}