import { decreaseQuality, decreaseSellIn, isExpired, Item } from "../item";

export function updateNormal(item: Item) {
    decreaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        decreaseQuality(item);
    }
}