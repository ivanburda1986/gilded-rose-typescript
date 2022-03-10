import {decreaseSellIn, increaseQuality, isExpired, Item} from "../item";
import {IUpdatableItem} from "../IUpdatableItem";

export const ITEM_AGED_BRIE = 'Aged Brie';

export function isAgedBrie(item: Item) {
    return item.name === ITEM_AGED_BRIE;
}

export function updateAgedBrie(item: Item) {
    increaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        increaseQuality(item);
    }

}

export class AgedBrie extends Item implements IUpdatableItem {
    update(): void {
        updateAgedBrie(this);
    }

    isSimilar(item: Item): boolean {
        return isAgedBrie(item);
    }

    create(item: Item): AgedBrie {
        return new AgedBrie(item.name, item.sellIn, item.quality);
    }
}