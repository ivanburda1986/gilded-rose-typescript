import {IUpdater} from "../IUpdater/IUpdater";
import {Item, qualityDecrease, qualityIncrease, sellInDecrease} from "../item";
import {SELL_IN_EXPIRED} from "../testSharedConstants";

export const AGED_BRIE_ITEM = 'Aged Brie';

export class AgedBrieStrategy implements IUpdater {
    isUsable(item: Item): boolean {
        return item.name === AGED_BRIE_ITEM;
    }

    update(item: Item): void {
        if (item.name == AGED_BRIE_ITEM) {
            qualityIncrease(item);
            sellInDecrease(item);
            if (item.sellIn < SELL_IN_EXPIRED) {
                qualityDecrease(item);
            }
        }
    }

}