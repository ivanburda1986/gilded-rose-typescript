import {IUpdater} from "../IUpdater/IUpdater";
import {Item} from "../item";

export const SULFURAS_ITEM = 'Sulfuras, Hand of Ragnaros';

export class SulfurasStrategy implements IUpdater {
    isUsable(item: Item): boolean {
        return item.name === SULFURAS_ITEM;
    }

    update(item: Item): void {
        return;
    }

}