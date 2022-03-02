import { decreaseSellIn, increaseQuality, isExpired, Item } from "../item";

export const ITEM_AGED_BRIE = 'Aged Brie';

export function isAgedBrie(item: Item) {
    return item.name == ITEM_AGED_BRIE;
}

export function updateAgedBrie(item: Item) {
    increaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        increaseQuality(item);
    }

}