import {Item} from "./item";
import {IUpdater} from "./IUpdater/IUpdater";


export class Shop {
    constructor(public items: Item[] = [], public strategies: IUpdater[] = [], public defaultStrategy: IUpdater) {
    }

    updateQuality() {
        this.items.forEach(item => {
            const myStrategy = this.strategies.find((strategy) => {
                return strategy.isUsable(item);
            })||this.defaultStrategy;
            myStrategy.update(item);
        }) ;
        return this.items;
    }
}


// if ( not ( not something && not something))  -> ! (! true && ! true) -> true || true

/**
 *   if (a | b) { doSomething }   => if (a) {doSomething} else if (b) {doSeomthing}
 *
 */
