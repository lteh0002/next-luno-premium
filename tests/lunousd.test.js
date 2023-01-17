import { getLunoTokenUSDPrice } from "../lib/getlunousd";

test("Returns Result for Luno token price in USD", async () => {
    expect(await getLunoTokenUSDPrice(30000, 3)).toBe(10000);
});