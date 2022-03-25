import {Item, qualityDecrease, qualityIncrease, qualitySetToMinimum, sellInDecrease} from "./item";
import {SELL_IN_EXPIRED} from "./testSharedConstants";
import {IUpdater} from "./IUpdater/IUpdater";

const CONCERT_TICKET_ITEM = 'Backstage passes to a TAFKAL80ETC concert';
const AGED_BRIE_ITEM = 'Aged Brie';
const SULFURAS_ITEM = 'Sulfuras, Hand of Ragnaros';


export class Shop {
    constructor(public items: Item[] = [], public strategies: IUpdater[] = []) {
    }

    updateQuality() {
        this.items.forEach(item => {
            if (item.name == SULFURAS_ITEM) {
                return;
            }

            if (item.name == AGED_BRIE_ITEM) {
                qualityIncrease(item);
                sellInDecrease(item);
                if (item.sellIn < SELL_IN_EXPIRED) {
                    qualityDecrease(item);
                }
            } else if (item.name == CONCERT_TICKET_ITEM) {
                qualityIncrease(item);
                if (item.sellIn < 11) {
                    qualityIncrease(item);
                }
                if (item.sellIn < 6) {
                    qualityIncrease(item);
                }
                sellInDecrease(item);
                if (item.sellIn < SELL_IN_EXPIRED) {
                    qualitySetToMinimum(item);
                }

            } else {
                //Normal item
                qualityDecrease(item);
                sellInDecrease(item);
                if (item.sellIn < SELL_IN_EXPIRED) {
                    qualityDecrease(item);

                }
            }

        });

        return this.items;

    }
}


// if ( not ( not something && not something))  -> ! (! true && ! true) -> true || true

/**
 *   if (a | b) { doSomething }   => if (a) {doSomething} else if (b) {doSeomthing}
 *
 */
