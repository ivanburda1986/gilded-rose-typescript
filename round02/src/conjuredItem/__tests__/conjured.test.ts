import {
    getShopWithItem,
    QUALITY_DECREASE_DOUBLE,
    QUALITY_POSITIVE,
    SELL_IN_EXPIRING,
    SELL_IN_POSITIVE
} from "../../testSharedConstants/shared";

export const ITEM_NAME_CONJURED = "Conjured";
export const QUALITY_DECREASE_QUADRUPLE = 1;

describe("Conjured", () => {
    it("degrades in quality twice as fast as normal items", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_CONJURED, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        gildedRose.updateQuality();
        const conjured = gildedRose.items[0];

        expect(conjured.quality).toEqual(QUALITY_DECREASE_DOUBLE);
    });
    it("once expired, degrades in quality twice as fast as normal expired items", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_CONJURED, SELL_IN_EXPIRING, QUALITY_POSITIVE);

        gildedRose.updateQuality();
        const conjured = gildedRose.items[0];

        expect(conjured.quality).toEqual(QUALITY_DECREASE_QUADRUPLE);
    });
});