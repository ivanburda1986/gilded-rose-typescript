import {IUpdater} from "../IUpdater/IUpdater";
import {Item, qualityDecrease, sellInDecrease} from "../item";
import {SELL_IN_EXPIRED} from "../testSharedConstants";


export class NormalItemStrategy implements IUpdater {
    isUsable(item: Item): boolean {
        return true;
    }

    update(item: Item): void {
        qualityDecrease(item);
        sellInDecrease(item);
        if (item.sellIn < SELL_IN_EXPIRED) {
            qualityDecrease(item);
        }
    }
}