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
  if (data.status === 401) {
    return ('Please check your API Credential')
  } else if (data.status === 429) {
      return('Please check your API Daily/Monthly Limit')
  } else {
      return('Failed to retrieve data')
  }
} else {
    let convertData = await data.json()
    return +(convertData.rates['MYR'])
}
}