import { getLunoTokenUSDPrice } from "../getlunousd";

test("Returns Result for Price Difference", async () => {
    expect(await getLunoTokenUSDPrice(30000, 3)).toBe(10000);
});