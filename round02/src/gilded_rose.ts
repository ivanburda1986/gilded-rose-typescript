import { Item } from "./item";

const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const SELL_IN_TICKET_FIRST_STAGE = 11;
const SELL_IN_TICKET_SECOND_STAGE = 6;
const SELL_IN_EXPIRED = 0;

export class Shop {
    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }


    updateQuality() {
        this.items.forEach(item => {
            if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.name != 'Sulfuras, Hand\ of Ragnaros') {
                    if (item.quality > QUALITY_MIN) {
                        item.quality -= 1;
                    }
                }
            } else {
                if (item.quality < QUALITY_MAX) {
                    item.quality += 1;
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.sellIn < SELL_IN_TICKET_FIRST_STAGE) {
                            if (item.quality < QUALITY_MAX) {
                                item.quality += 1;
                            }
                        }
                        if (item.sellIn < SELL_IN_TICKET_SECOND_STAGE) {
                            if (item.quality < QUALITY_MAX) {
                                item.quality += 1;
                            }
                        }
                    }
                }
            }
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.sellIn -= 1;
            }

            if (item.sellIn < SELL_IN_EXPIRED) {
                if (item.name != 'Aged Brie') {
                    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.quality > QUALITY_MIN) {
                            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                                item.quality -= 1;
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality;
                    }
                } else {
                    if (item.quality < QUALITY_MAX) {
                        item.quality += 1;
                    }
                }
            }
        });

        return this.items;
    }
}
