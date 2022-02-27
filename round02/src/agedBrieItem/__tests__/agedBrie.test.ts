import {
    getShopWithItem,
    QUALITY_INCREASE_DOUBLE,
    QUALITY_INCREASE_REGULAR,
    QUALITY_POSITIVE,
    SELL_IN_EXPIRING,
    SELL_IN_POSITIVE
} from "../../testSharedConstants/shared";

export const ITEM_NAME_AGED_BRIE = "Aged Brie";
export const QUALITY_MAXIMUM_50 = 50;

describe("Aged Brie", () => {
        it("quality increases the older the item gets", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_POSITIVE, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const agedBrie = gildedRose.items[0];

            expect(agedBrie.quality).toEqual(QUALITY_INCREASE_REGULAR);
        })
        it("quality increase twice as fast when the item expired", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_EXPIRING, QUALITY_POSITIVE);

            gildedRose.updateQuality();
            const agedBrie = gildedRose.items[0];

            expect(agedBrie.quality).toEqual(QUALITY_INCREASE_DOUBLE);
        })

        it("quality never exceeds the maximum item quality of 50", () => {
            const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_EXPIRING, QUALITY_MAXIMUM_50);

            gildedRose.updateQuality();
            const agedBrie = gildedRose.items[0];

            expect(agedBrie.quality).toEqual(QUALITY_MAXIMUM_50);
        });
    }
)
