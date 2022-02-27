import {
    getShopWithItem,
    ITEM_NAME_DEFAULT,
    QUALITY_DECREASE_DOUBLE,
    QUALITY_DECREASE_REGULAR,
    QUALITY_POSITIVE,
    QUALITY_ZERO,
    SELL_IN_DECREASE_REGULAR,
    SELL_IN_EXPIRING,
    SELL_IN_POSITIVE
} from "../testSharedConstants/shared";

describe("An item, unless it has some special type-related behaviour,", () => {
    it("has sell-in and quality values when added to the store", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        const foo = gildedRose.items[0];

        expect(foo.name).toEqual(ITEM_NAME_DEFAULT);
        expect(foo.sellIn).toEqual(SELL_IN_POSITIVE);
        expect(foo.quality).toEqual(QUALITY_POSITIVE);
    });
    it("degrades in quality by 1 at the end of each day", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        gildedRose.updateQuality();
        const foo = gildedRose.items[0];

        expect(foo.quality).toEqual(QUALITY_DECREASE_REGULAR);
    });

    it("once expired, degrades in quality at double speed", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_EXPIRING, QUALITY_POSITIVE);

        gildedRose.updateQuality();
        const foo = gildedRose.items[0];

        expect(foo.quality).toEqual(QUALITY_DECREASE_DOUBLE);
    });

    it("never has negative quality", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_ZERO);

        gildedRose.updateQuality();
        const foo = gildedRose.items[0];

        expect(foo.quality).toEqual(QUALITY_ZERO);
    });

    it("reduces its sell-in value by 1 at the end of each day", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_ZERO);

        gildedRose.updateQuality();
        const foo = gildedRose.items[0];

        expect(foo.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
    });
});