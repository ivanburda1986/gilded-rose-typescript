import {Item} from "./item";
import {IUpdater} from "./IUpdater";

export const ITEM_NAME_SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class SulfurasStrategy implements IUpdater{
    isUsable(item: Item): boolean {
        return item.name === ITEM_NAME_SULFURAS;
    }

    update(item: Item): void {
        return;
    }

}
