import {decreaseSellIn, increaseQuality, isExpired, Item, setMinimumQuality} from "./item";
import {IUpdater} from "./IUpdater";

export const ITEM_NAME_CONCERT_TICKET = "Backstage passes to a TAFKAL80ETC concert";

export class ConcertTicketStrategy implements IUpdater{
    isUsable(item: Item): boolean {
        return item.name === ITEM_NAME_CONCERT_TICKET;
    }

    update(item: Item): void {
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
    }
}



