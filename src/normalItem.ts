import {decreaseQuality, decreaseSellIn, isExpired, Item} from "./item";
import {IUpdater} from "./IUpdater";

export class NormalItemStrategy implements IUpdater{
    isUsable(item: Item): boolean {
        return true;
    }

    update(item: Item): void {
        decreaseQuality(item);
        decreaseSellIn(item);

        if (isExpired(item)) {
            decreaseQuality(item)
        }
    }
}
