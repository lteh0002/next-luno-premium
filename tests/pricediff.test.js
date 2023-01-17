import { getPriceDifference } from "../pricediff";

test("Returns Result for Price Difference", async () => {
    expect(await getPriceDifference(30000, 10000)).toBe(20000);
});