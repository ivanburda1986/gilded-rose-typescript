import { Item } from "../item";
import {IUpdatableItem} from "../IUpdatableItem";

export const ITEM_SULFURAS = 'Sulfuras, Hand\ of Ragnaros';

export function isSulfuras(item: Item) {
    return item.name == ITEM_SULFURAS;
}

export class Sulfuras extends Item implements IUpdatableItem{
    create(item: Item): IUpdatableItem {
        return new Sulfuras(item.name, item.sellIn, item.quality)
    }

    isSimilar(item: Item): boolean {
        return isSulfuras(item);
    }

    update(): void {
        return;
    }

}