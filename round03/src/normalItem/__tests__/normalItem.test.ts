import {Item, Shop} from "../../gilded_rose";
const NORMAL_ITEM = "Normal Item";
const SELL_IN_POSITIVE = 5;
const QUALITY_POSITIVE = 5;

function getShopWithItem(name: string, sellIn: number, quality: number){
    return new Shop([new Item(name, sellIn, quality)]);
}

describe("Normal item", () => {
    it("has sellIn and quality value", () => {
        const gildedRose = getShopWithItem(NORMAL_ITEM,SELL_IN_POSITIVE, QUALITY_POSITIVE);
        const items = gildedRose.items[0];
        expect(items[0].sellIn).toEqual(SELL_IN_POSITIVE);
        expect(items[0].quality).toEqual(QUALITY_POSITIVE);
    });

    it("A normal item decreases sellIn by 1 every day", () => {

    });

    it("A normal item decreases quality by 1 every day", () => {

    });

    it("An normal expired item decreases quality by 2 every day", () => {

    });

    it("The minimum quality of an item is 0", () => {

    });
});