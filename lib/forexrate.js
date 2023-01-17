export async function getUSDMYRForexRate() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", process.env.YOUR_API);

  var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
  };

  try {
      let data = await fetch('https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD', requestOptions)
      if (data.status === 200) {
        let convertData = await data.json()
        return +(convertData.rates['MYR'])
      } else if (data.status !== 200) {
          if (data.status === 401) {
            throw new Error('Please check your API Credential')
          } else if (data.status === 429) {
              throw new Error('Please check your API Daily/Monthly Limit')
          } else {
              throw new Error('Failed to retrieve data')
          }
      }
  } catch (error){
      return error.toString()
  }
}
