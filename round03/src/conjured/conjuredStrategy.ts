import {IUpdater} from "../IUpdater/IUpdater";
import {Item, qualityDecrease, qualitySetToMinimum, sellInDecrease} from "../item";
import {SELL_IN_EXPIRED} from "../testSharedConstants";

const CONJURED_ITEM = 'Conjured';

export class ConjuredStrategy implements  IUpdater{
    isUsable(item: Item): boolean {
        return item.name === CONJURED_ITEM;
    }

    update(item: Item): void {
        qualityDecrease(item);
        qualityDecrease(item);
        if (item.sellIn <= SELL_IN_EXPIRED) {
            qualityDecrease(item);
            qualityDecrease(item);
        }
        return;
    }
}