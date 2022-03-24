import {QUALITY_MINIMUM} from "./testSharedConstants";

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

const CONCERT_TICKET_ITEM = 'Backstage passes to a TAFKAL80ETC concert';
const AGED_BRIE_ITEM = 'Aged Brie';
const SULFURAS_ITEM = 'Sulfuras, Hand of Ragnaros';

const QUALITY_MIN = 0;
const QUALITY_MAX = 50;

const SELL_IN_EXPIRED = 0;

function qualityDecrease(item: Item) {
    if (item.quality > QUALITY_MIN) {
        item.quality = item.quality - 1;
    }
}

function qualityIncrease(item: Item) {
    if (item.quality < QUALITY_MAX) {
        item.quality = item.quality + 1;
    }
}

function qualitySetToMinimum(item: Item) {
    item.quality = item.quality - item.quality;
}

function sellInDecrease(item: Item) {
    item.sellIn = item.sellIn - 1;
}

export class Shop {
    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            if (item.name != AGED_BRIE_ITEM && item.name != CONCERT_TICKET_ITEM) {
                if (item.name != SULFURAS_ITEM) {
                    qualityDecrease(item);
                }
            } else {
                if (item.quality < QUALITY_MAX) {
                    item.quality = item.quality + 1;
                    if (item.name == CONCERT_TICKET_ITEM) {
                        if (item.sellIn < 11) {
                            qualityIncrease(item);
                        }
                        if (item.sellIn < 6) {
                            qualityIncrease(item);
                        }
                    }
                }
            }
            if (item.name != SULFURAS_ITEM) {
                sellInDecrease(item);
            }
            if (item.sellIn < SELL_IN_EXPIRED) {
                if (item.name != AGED_BRIE_ITEM) {
                    if (item.name != CONCERT_TICKET_ITEM) {
                        if (item.quality > QUALITY_MIN) {
                            if (item.name != SULFURAS_ITEM) {
                                qualityDecrease(item);
                            }
                        }
                    } else {
                        qualitySetToMinimum(item);
                    }
                } else {
                    qualityIncrease(item);
                }
            }
        });

        return this.items;

    }
}
