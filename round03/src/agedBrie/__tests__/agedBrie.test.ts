import {
    getShopWithItem, QUALITY_INCREASE_DOUBLE,
    QUALITY_INCREASE_REGULAR,
    QUALITY_MAXIMUM,
    QUALITY_POSITIVE, SELL_IN_EXPIRED,
    SELL_IN_POSITIVE
} from "../../testSharedConstants";

const AGED_BRIE_ITEM = 'Aged Brie';


describe("Aged Brie", () => {
    it("increases quality by 1 every day", () => {
        const gildedRose = getShopWithItem(AGED_BRIE_ITEM, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const agedBrie = gildedRose.items[0];
        expect(agedBrie.quality).toEqual(QUALITY_INCREASE_REGULAR);
    });

    it("quality increase twice as fast when the item expired", () => {
        const gildedRose = getShopWithItem(AGED_BRIE_ITEM, SELL_IN_EXPIRED, QUALITY_POSITIVE);

        gildedRose.updateQuality();
        const agedBrie = gildedRose.items[0];

        expect(agedBrie.quality).toEqual(QUALITY_INCREASE_DOUBLE);
    })

    it("The maximum quality of an item is 50", () => {
        const gildedRose = getShopWithItem(AGED_BRIE_ITEM, SELL_IN_POSITIVE, QUALITY_MAXIMUM);

        gildedRose.updateQuality();

        const agedBrie = gildedRose.items[0];
        expect(agedBrie.quality).toEqual(QUALITY_MAXIMUM);

    });


});