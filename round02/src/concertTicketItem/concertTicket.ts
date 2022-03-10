import {decreaseSellIn, increaseQuality, isExpired, Item, setMinQuality} from "../item";
import {IUpdatableItem} from "../IUpdatableItem";
import {AgedBrie} from "../agedBrieItem/agedBrie";

export const ITEM_CONCERT_TICKET = 'Backstage passes to a TAFKAL80ETC concert';

export function isConcertTicket(item: Item) {
    return item.name == ITEM_CONCERT_TICKET;
}

export const SELL_IN_TICKET_FIRST_STAGE = 11;
export const SELL_IN_TICKET_SECOND_STAGE = 6;

export function updateConcertTicket(item: Item) {
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

export class ConcertTicket extends Item implements IUpdatableItem {
    update(): void {
        updateConcertTicket(this);
    }

    create(item: Item): IUpdatableItem {
        return new ConcertTicket(item.name, item.sellIn, item.quality);
    }

    isSimilar(item: Item): boolean {
       return isConcertTicket(item);
    }

}