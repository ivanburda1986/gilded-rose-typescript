import {IUpdater} from "../IUpdater/IUpdater";
import {Item, qualityIncrease, qualitySetToMinimum, sellInDecrease} from "../item";
import {SELL_IN_EXPIRED} from "../testSharedConstants";

export const CONCERT_TICKET_ITEM = 'Backstage passes to a TAFKAL80ETC concert';

export class ConcertTicketStrategy implements IUpdater {
    isUsable(item: Item): boolean {
        return item.name === CONCERT_TICKET_ITEM;
    }

    update(item: Item): void {
        qualityIncrease(item);
        if (item.sellIn < 11) {
            qualityIncrease(item);
        }
        if (item.sellIn < 6) {
            qualityIncrease(item);
        }
        sellInDecrease(item);
        if (item.sellIn <= SELL_IN_EXPIRED) {
            qualitySetToMinimum(item);
        }
        return;

    }


}