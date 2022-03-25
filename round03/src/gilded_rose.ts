import {Item, qualityDecrease, qualityIncrease, qualitySetToMinimum, sellInDecrease} from "./item";
import {SELL_IN_EXPIRED} from "./testSharedConstants";
import {IUpdater} from "./IUpdater/IUpdater";
import {AGED_BRIE_ITEM} from "./agedBrie/agedBrieStrategy";
import {CONCERT_TICKET_ITEM} from "./concertTicket/concertTicketStrategy";
import {SULFURAS_ITEM} from "./sulfuras/sulfurasStrategy";


export class Shop {
    constructor(public items: Item[] = [], public strategies: IUpdater[] = []) {
    }

    updateQuality() {
        this.items.forEach(item => {
            const myStrategy = this.strategies.find((strategy)=>{
                return strategy.isUsable(item);
            })
            myStrategy.update(item);

            if (item.name == SULFURAS_ITEM) {
                return;
            }

            if (item.name == CONCERT_TICKET_ITEM) {
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
                return;
            }
            //Normal item
            qualityDecrease(item);
            sellInDecrease(item);
            if (item.sellIn < SELL_IN_EXPIRED) {
                qualityDecrease(item);

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
