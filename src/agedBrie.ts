import {decreaseSellIn, increaseQuality, isExpired, Item} from "./item";
import {IUpdater} from "./IUpdater";

export const ITEM_NAME_AGED_BRIE = "Aged Brie";

export class AgedBrieStrategy implements  IUpdater{
    isUsable(item: Item): boolean {
        return item.name === ITEM_NAME_AGED_BRIE;
    }

    update(item: Item): void {
        increaseQuality(item)
        decreaseSellIn(item);


        if (isExpired(item)) {
            increaseQuality(item)
        }
        return;
    }
    return;
}
