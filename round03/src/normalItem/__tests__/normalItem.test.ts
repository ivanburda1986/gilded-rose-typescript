import {Item, Shop} from "../../gilded_rose";
import {
    QUALITY_DECREASE_REGULAR,
    QUALITY_DECREASE_DOUBLE,
    SELL_IN_DECREASE_REGULAR,
    SELL_IN_EXPIRED,
    QUALITY_ZERO, getShopWithItem
} from "../../testSharedConstants";

const NORMAL_ITEM = "Normal Item";
const SELL_IN_POSITIVE = 5;
const QUALITY_POSITIVE = 5;

describe("Normal item", () => {
    it("has sellIn and quality value", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_POSITIVE, QUALITY_POSITIVE);

        const normalItem = gildedRose.items[0];
        expect(normalItem.sellIn).toEqual(SELL_IN_POSITIVE);
        expect(normalItem.quality).toEqual(QUALITY_POSITIVE);
    });

    it("A normal item decreases sellIn by 1 every day", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_POSITIVE,QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const normalItem = gildedRose.items[0];
        expect(normalItem.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
    });

    it("A normal item decreases quality by 1 every day", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_POSITIVE,QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const normalItem = gildedRose.items[0];
        expect(normalItem.quality).toEqual(QUALITY_DECREASE_REGULAR);
    });

    it("An normal expired item decreases quality by 2 every day", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_EXPIRED,QUALITY_POSITIVE);

        gildedRose.updateQuality();

        const normalItem = gildedRose.items[0];
        expect(normalItem.quality).toEqual(QUALITY_DECREASE_DOUBLE);
    });

    it("The minimum quality of an item is 0", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_POSITIVE,QUALITY_ZERO);

        gildedRose.updateQuality();

        const normalItem = gildedRose.items[0];
        expect(normalItem.quality).toEqual(QUALITY_ZERO);

    });
});