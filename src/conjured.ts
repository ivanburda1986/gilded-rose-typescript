import {decreaseSellIn, decreaseQuality, isExpired, Item, increaseQuality} from "./item";
import {IUpdater} from "./IUpdater";

export const ITEM_NAME_CONJURED = "Conjured";

export class ConjuredStrategy implements IUpdater{
    isUsable(item: Item): boolean {
        return item.name === ITEM_NAME_CONJURED;
    }

    update(item: Item): void {
        decreaseSellIn(item)
        decreaseQuality(item)
        decreaseQuality(item)

        if (isExpired(item)) {
            decreaseQuality(item)
            decreaseQuality(item)
        }
    }

}