import {getShopWithItem} from "../../testSharedConstants";

const SULFURAS_ITEM = 'Sulfuras, Hand of Ragnaros';
const SULFURAS_SELL_IN = 999;
const SULFURAS_QUALITY = 80;

describe("Sulfuras, Hand of Ragnaros", () => {
    it("never changes quality", () => {
        const gildedRose = getShopWithItem(SULFURAS_ITEM, SULFURAS_SELL_IN, SULFURAS_QUALITY);

        gildedRose.updateQuality();

        const sulfuras = gildedRose.items[0];
        expect(sulfuras.quality).toEqual(SULFURAS_QUALITY);
    });

    it("never changes sellIn", () => {
        const gildedRose = getShopWithItem(SULFURAS_ITEM, SULFURAS_SELL_IN, SULFURAS_QUALITY);

        gildedRose.updateQuality();

        const sulfuras = gildedRose.items[0];
        expect(sulfuras.sellIn).toEqual(SULFURAS_SELL_IN);

    });

});