export class Item {
    constructor(public name: string, public sellIn: number, public quality: number) {
    }
}

export const QUALITY_MIN = 0;
export const QUALITY_MAX = 50;
export const SELL_IN_EXPIRED = 0;

export function decreaseQuality(item: Item) {
    if (item.quality > QUALITY_MIN) {
        item.quality -= 1;
    }
}

export function increaseQuality(item: Item) {
    if (item.quality < QUALITY_MAX) {
        item.quality += 1;
    }
}

export function decreaseSellIn(item: Item) {
    item.sellIn -= 1;
}

export function isExpired(item: Item) {
    return item.sellIn < SELL_IN_EXPIRED;
}

export function setMinQuality(item: Item) {
    item.quality = QUALITY_MIN;
}