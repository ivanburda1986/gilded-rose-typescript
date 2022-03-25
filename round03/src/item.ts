import {QUALITY_MAXIMUM, QUALITY_MINIMUM} from "./testSharedConstants";

export class Item {
    constructor(public name: string, public sellIn: number, public quality: number) {
    }
}

export function qualityDecrease(item: Item) {
    if (item.quality > QUALITY_MINIMUM) {
        item.quality = item.quality - 1;
    }
}

export function qualityIncrease(item: Item) {
    if (item.quality < QUALITY_MAXIMUM) {
        item.quality = item.quality + 1;
    }
}

export function qualitySetToMinimum(item: Item) {
    item.quality = item.quality - item.quality;
}

export function sellInDecrease(item: Item) {
    item.sellIn = item.sellIn - 1;
}