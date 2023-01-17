import { getPricePremium } from "../pricepremium";

test("Returns Result for Price Premium", async () => {
    expect(await getPricePremium(20000, 40000)).toBe((50));
});