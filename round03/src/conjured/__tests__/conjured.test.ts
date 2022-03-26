import {
    getShopWithItem,
    QUALITY_DECREASE_DOUBLE,
    QUALITY_DECREASE_QUADRUPLE,
    QUALITY_POSITIVE, SELL_IN_EXPIRED,
    SELL_IN_POSITIVE
} from "../../testSharedConstants";

const CONJURED_ITEM = 'Conjured';

describe("Conjured", () => {
    it("decreases quality by 2", () => {
        const gildedRose = getShopWithItem(CONJURED_ITEM, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const conjured = gildedRose.items[0];
        expect(conjured.quality).toEqual(QUALITY_DECREASE_DOUBLE);
    });

    it("expired decreases quality by 4", () => {
        const gildedRose = getShopWithItem(CONJURED_ITEM, SELL_IN_EXPIRED, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const conjured = gildedRose.items[0];
        expect(conjured.quality).toEqual(QUALITY_DECREASE_QUADRUPLE);

    });
});