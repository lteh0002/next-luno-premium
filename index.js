import * as env from 'dotenv'
env.config()

import { getUserPrompt } from './lib/userprompt.js'
import { getLunoTokenUSDPrice } from './lib/getlunousd.js'
import { obtainPrice } from './lib/obtainprice.js'
import { loopFetchPrice } from './lib/loopresult.js'

//Integrating all code to obtain results
async function getTokenPrice() {
    let userPrompt = await getUserPrompt()
    let loopPrice = await loopFetchPrice(userPrompt)
    
}

getTokenPrice()