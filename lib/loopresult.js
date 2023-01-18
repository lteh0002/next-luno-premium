import { obtainPrice } from "./obtainprice.js";
//Looping results every 3 seconds
export async function loopFetchPrice(userPrompt) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function loop() {
      console.log(`Print 1st time...`);
      const [lunoFetchStatus, forexFetchStatus, binanceFetchStatus] = await obtainPrice(userPrompt)
      if (lunoFetchStatus === true && forexFetchStatus === true && binanceFetchStatus === true) {
        for (let i = 2; i <= 3; i++) {
          console.log(`Print ${i}st time...`);
          await sleep(3000);
          await obtainPrice(userPrompt)
        }
          console.log('Done');
      } else if (lunoFetchStatus === false || forexFetchStatus === false || binanceFetchStatus === false)
          console.log('There is an error, please try again');
      }
      loop();
}