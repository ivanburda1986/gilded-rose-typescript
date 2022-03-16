import {Item, Shop} from "../../gilded_rose";

describe("Normal item", () => {
    it("has sellIn and quality value", () => {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fixme");
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