import {IUpdatableItem} from "./IUpdatableItem";

export class Shop {

    constructor(public items: (IUpdatableItem)[] = []) {

    }

    updateQuality() {
        this.items.forEach(item => {
            item.update();
            return;
        });
        return this.items;
    }
}
