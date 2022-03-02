import { Item } from "./item";

const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const SELL_IN_TICKET_FIRST_STAGE = 11;
const SELL_IN_TICKET_SECOND_STAGE = 6;
const SELL_IN_EXPIRED = 0;
const ITEM_AGED_BRIE = 'Aged Brie';
const ITEM_CONCERT_TICKET = 'Backstage passes to a TAFKAL80ETC concert';
const ITEM_SULFURAS = 'Sulfuras, Hand\ of Ragnaros';

function isSulfuras(item: Item) {
    return item.name == ITEM_SULFURAS;
}

function isConcertTicket(item: Item) {
    return item.name == ITEM_CONCERT_TICKET;
}

function isAgedBrie(item: Item) {
    return item.name == ITEM_AGED_BRIE;
}

function decreaseQuality(item: Item) {
    if (item.quality > QUALITY_MIN) {
        item.quality -= 1;
    }
}

function increaseQuality(item: Item) {
    if (item.quality < QUALITY_MAX) {
        item.quality += 1;
    }
}

function decreaseSellIn(item: Item) {
    item.sellIn -= 1;
}

function isExpired(item: Item) {
    return item.sellIn < SELL_IN_EXPIRED;
}

function setMinQuality(item: Item) {
    item.quality = QUALITY_MIN;
}

function updateAgedBrie(item: Item) {
    increaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        increaseQuality(item);
    }

}

function updateConcertTicket(item: Item) {
    increaseQuality(item);
    if (item.sellIn < SELL_IN_TICKET_FIRST_STAGE) {
        increaseQuality(item);
    }
    if (item.sellIn < SELL_IN_TICKET_SECOND_STAGE) {
        increaseQuality(item);
    }
    decreaseSellIn(item);
    if (isExpired(item)) {
        setMinQuality(item);
    }

}

function updateNormal(item: Item) {
    decreaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        decreaseQuality(item);
    }
}

export class Shop {
    items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }


    updateQuality() {
        this.items.forEach(item => {

            if (isSulfuras(item)) {
                return;
            }


            if (isAgedBrie(item)) {
                updateAgedBrie(item);
                return;
            }


            if (isConcertTicket(item)) {
                updateConcertTicket(item);
                return;
            }


            //Normal item
            updateNormal(item);
        });
        return this.items;
    }
}
