import { obtainPrice } from "./obtainprice.js";

//Looping results every 3 seconds
export async function loopFetchPrice(userPrompt) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function loop() {
      if (obtainedPrice !== true) {
        await obtainPrice(userPrompt)
      } else {
          for (let i = 1; i < 4; i++) {
            console.log(`Loop ${i}st time...`);
                  await obtainPrice(userPrompt)
                  await sleep(3000);
              }
              console.log('Done');
      }
    }
    loop();
}