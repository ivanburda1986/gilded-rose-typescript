export const QUALITY_MAXIMUM = 50;
export const QUALITY_MINIMUM = 0;
export const SELL_IN_EXPIRING = 0;

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export function decreaseQuality(item: Item) {
    if (item.quality > QUALITY_MINIMUM) {
        item.quality -= 1;
    }
}

export function increaseQuality(item: Item) {
    if (item.quality < QUALITY_MAXIMUM) {
        item.quality += 1;
    }
}

export function decreaseSellIn(item: Item) {
    item.sellIn -= 1;
}

export function setMinimumQuality(item: Item) {
    item.quality = QUALITY_MINIMUM;
}

export function isExpired(item: Item) {
    return item.sellIn < SELL_IN_EXPIRING;
}