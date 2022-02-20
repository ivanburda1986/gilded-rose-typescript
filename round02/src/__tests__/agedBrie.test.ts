import { getShopWithItem } from "./shared";
import {SELL_IN_SOME_VALUE, QUALITY_INCREASE_REGULAR} from './shared'
export const ITEM_NAME_AGED_BRIE = "Aged Brie";

describe("Aged Brie", () => {
        it("Aged Brie quality increases the older the item gets", () => {
            const gildedRose = getShopWithItem({ITEM_NAME_AGED_BRIE, SELL_IN_SOME_VALUE, QUALITY_INCREASE_REGULAR} );

            gildedRose.updateQuality();
            const agedBrie = gildedRose.items[0];

            expect(agedBrie.quality).toEqual(QUALITY_INCREASE_REGULAR);
        })
    }
)
