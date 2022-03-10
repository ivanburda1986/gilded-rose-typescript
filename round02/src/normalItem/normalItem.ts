import {decreaseQuality, decreaseSellIn, isExpired, Item} from "../item";
import {IUpdatableItem} from "../IUpdatableItem";

export function updateNormal(item: Item) {
    decreaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
        decreaseQuality(item);
    }
}

export class NormalItem extends Item implements IUpdatableItem {
    create(item: Item): IUpdatableItem {
        return new NormalItem(item.name, item.sellIn, item.quality);
    }

    isSimilar(item: Item): boolean {
        return true;
    }

    update(): void {
        updateNormal(this);
    }

}