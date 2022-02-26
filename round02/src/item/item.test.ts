import {getShopWithItem,ITEM_NAME_DEFAULT,SELL_IN_POSITIVE,QUALITY_POSITIVE} from '../__tests__/shared'
describe("An item, unless it has some special type-related behaviour,", () => {
    it("has sell-in and quality values when added to the store", () => {
        const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE);

        const foo = gildedRose.items[0];

        expect(foo.name).toEqual(ITEM_NAME_DEFAULT);
        expect(foo.sellIn).toEqual(SELL_IN_POSITIVE);
        expect(foo.quality).toEqual(QUALITY_POSITIVE);
    });
    it("degrades in quality by 1 at the end of each day", () => {

    });

    it("once expired, degrades in quality at double speed", () => {

    });

    it("never has negative quality", () => {

    });

    it("reduces its sell-in value by 1 at the end of each day", () => {

    });
});