import {Item} from "./item";
import {IUpdater} from "./IUpdater";

export class Shop {

    items: Item[];
    strategies: IUpdater[]
    defaultStrategy: IUpdater;

    constructor(items: Item[] = [], strategies:IUpdater[] =[], defaultStrategy:IUpdater ) {
        this.items = items;
        this.strategies=strategies;
        this.defaultStrategy = defaultStrategy;
    }

    updateQuality() {

        this.items.forEach(item => {
           const myStrategy =  this.strategies.find(strategy=>{
               return strategy.isUsable(item);
           }) || this.defaultStrategy;

            myStrategy.update(item);
        });
        return this.items;
    }
}