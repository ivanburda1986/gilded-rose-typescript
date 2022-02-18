import {Item} from "./item";
import {IUpdater} from "./IUpdater";

export class Shop {

    items: Item[];
    strategies: IUpdater[]

    constructor(items: Item[] = [], strategies:IUpdater[] =[] ) {
        this.items = items;
        this.strategies=strategies;
    }

    updateQuality() {

        this.items.forEach(item => {
            this.strategies.forEach(strategy=>{
                if(strategy.isUsable(item)){
                    strategy.update(item);
                }
            })
        });
        return this.items;
    }
}