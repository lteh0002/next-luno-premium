import { getPriceDifference, getPricePremium } from "../lib/pricecalc.js";

test("Returns Result for price difference", async () => {
    expect.assertions(1)
    expect(await getPriceDifference(30000, 10000)).toBe(20000);
});

test("Returns Result for price premium", async () => {
    expect.assertions(1)
    expect(await getPricePremium(20000, 40000)).toBe((50));
});