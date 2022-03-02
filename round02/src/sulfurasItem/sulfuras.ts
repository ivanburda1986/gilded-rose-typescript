import { Item } from "../item";

export const ITEM_SULFURAS = 'Sulfuras, Hand\ of Ragnaros';

export function isSulfuras(item: Item) {
    return item.name == ITEM_SULFURAS;
}