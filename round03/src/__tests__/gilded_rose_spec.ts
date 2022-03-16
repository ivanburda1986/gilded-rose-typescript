import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", () => {

    it("An item has sellIn and quality value", () => {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fixme");
    });

});
