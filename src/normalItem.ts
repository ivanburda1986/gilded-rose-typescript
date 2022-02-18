import {decreaseQuality, decreaseSellIn, isExpired, Item} from "./item";
import {IUpdater} from "./IUpdater";
import {ITEM_NAME_AGED_BRIE} from "./agedBrie";
import {ITEM_NAME_CONCERT_TICKET} from "./concertTicket";
import {ITEM_NAME_SULFURAS} from "./sulfuras";
import {ITEM_NAME_CONJURED} from "./conjured";

const items = [ITEM_NAME_AGED_BRIE,ITEM_NAME_CONCERT_TICKET,ITEM_NAME_SULFURAS,ITEM_NAME_CONJURED]

export class NormalItemStrategy implements IUpdater{
    isUsable(item: Item): boolean {
        return !items.includes(item.name);
    }

    update(item: Item): void {
        decreaseQuality(item);
        decreaseSellIn(item);

        if (isExpired(item)) {
            decreaseQuality(item)
        }
    }
}
