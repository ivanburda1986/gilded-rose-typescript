import {Item} from "./item";
import {IUpdatableItem} from "./IUpdatableItem";

export class ItemFactory {
    constructor(public itemTypes: IUpdatableItem[], public defaultItemType: IUpdatableItem) {

    }

    create(items: Item[]): IUpdatableItem[] {
        //1000 000 items; 1000 000 item types; all my 1M items default
        //Comparison count; 1M*1M; O(n*n);
        return items.map(item => {
            const myItemType: IUpdatableItem = this.itemTypes.find(itemType => itemType.isSimilar(item)) || this.defaultItemType;
            return myItemType.create(item);
        });
    };
}

/**
 * [
 * new Item("ITEM_NAME_AGED_BRIE", "SELL_IN_POSITIVE", "QUALITY_POSITIVE"),
 * new Item("ITEM_NAME_CONCERT_TICKET", "SELL_IN_POSITIVE", "QUALITY_POSITIVE")
 * ]
 *
 * [
 * new AgedBrie("ITEM_NAME_AGED_BRIE", "SELL_IN_POSITIVE", "QUALITY_POSITIVE"),
 * new ConcertTicket("ITEM_NAME_CONCERT_TICKET", "SELL_IN_POSITIVE", "QUALITY_POSITIVE")
 * ]
 *
 *
 *
 *
 *
 *
 *
 */