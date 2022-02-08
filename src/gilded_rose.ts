const ITEM_NAME_SULFURAS = 'Sulfuras, Hand of Ragnaros';
const ITEM_NAME_CONCERT_TICKET = 'Backstage passes to a TAFKAL80ETC concert';
const ITEM_NAME_AGED_BRIE = 'Aged Brie';

const QUALITY_MAXIMUM = 50;
const QUALITY_MINIMUM = 0;

const SELL_IN_EXPIRING = 0;

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

function isAgedBrie(item: Item) {
    return item.name == ITEM_NAME_AGED_BRIE;
}

function isTicket(item: Item) {
    return item.name == ITEM_NAME_CONCERT_TICKET;
}

function isSulfuras(item: Item) {
    return item.name == ITEM_NAME_SULFURAS;
}

function decreaseQuality(item: Item) {
    if (item.quality > QUALITY_MINIMUM) {
        item.quality -= 1;
    }
}

function increaseQuality(item: Item) {
    if (item.quality < QUALITY_MAXIMUM) {
        item.quality += 1;
    }
}

function decreaseSellIn(item: Item) {
    item.sellIn -= 1;
}

function setMinimumQuality(item: Item) {
    item.quality = QUALITY_MINIMUM;
}

function isExpired(item: Item) {
    return item.sellIn < SELL_IN_EXPIRING;
}

export class Shop {

    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            if (isSulfuras(item)) {
                return
            }

            if (isAgedBrie(item)) {
                increaseQuality(item)
                decreaseSellIn(item);


                if (isExpired(item)) {
                    increaseQuality(item)
                }
                return
            }


            if (isTicket(item)) {
                if (item.sellIn < 11) {
                    increaseQuality(item);
                }
                if (item.sellIn < 6) {
                    increaseQuality(item)
                }

                increaseQuality(item)
                decreaseSellIn(item);
                if (isExpired(item)) {
                    setMinimumQuality(item);
                }
                return
            }

            //Normal item
            decreaseQuality(item);
            decreaseSellIn(item);

            if (isExpired(item)) {
                decreaseQuality(item)
            }
        });
        return this.items;
    }
}