import { getPriceDifference } from "../lib/pricediff.js";
import { getPricePremium } from "../lib/pricepremium.js";

test("Returns Result for price difference", async () => {
    expect(await getPriceDifference(30000, 10000)).toBe(20000);
});

test("Returns Result for price premium", async () => {
    expect(await getPricePremium(20000, 40000)).toBe((50));
});