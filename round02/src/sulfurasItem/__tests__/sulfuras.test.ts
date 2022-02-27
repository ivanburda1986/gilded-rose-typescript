import { getShopWithItem } from "../../testSharedConstants/shared";

export const ITEM_NAME_SULFURAS = "Sulfuras, Hand of Ragnaros";
export const QUALITY_SULFURAS_LEGENDARY_FIXED_80 = 80;
export const SELL_IN_SULFURAS_LEGENDARY_FIXED = 999;

describe("Sulfuras, being a legendary item,", () => {
    it("never has to be sold so its sell-in does not change", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80);

        gildedRose.updateQuality();
        const sulfuras = gildedRose.items[0];

        expect(sulfuras.sellIn).toEqual(SELL_IN_SULFURAS_LEGENDARY_FIXED);
    });
    it("has quality of 80 which does not change", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80);

        gildedRose.updateQuality();
        const sulfuras = gildedRose.items[0];

        expect(sulfuras.quality).toEqual(QUALITY_SULFURAS_LEGENDARY_FIXED_80)
    });
});