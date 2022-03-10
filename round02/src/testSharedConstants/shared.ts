import {Shop} from "../gilded_rose";
import {Item} from "../item";
import {ItemFactory} from "../itemFactory";
import {AgedBrie} from "../agedBrieItem/agedBrie";
import {ConcertTicket} from "../concertTicketItem/concertTicket";
import {NormalItem} from "../normalItem/normalItem";
import {Sulfuras} from "../sulfurasItem/sulfuras";

export const ITEM_NAME_DEFAULT = "foo";

export const SELL_IN_POSITIVE = 5;
export const SELL_IN_DECREASE_REGULAR = 4;
export const SELL_IN_EXPIRING = 0;

export const QUALITY_POSITIVE = 5;
export const QUALITY_DECREASE_REGULAR = 4;
export const QUALITY_DECREASE_DOUBLE = 3;
export const QUALITY_ZERO = 0;

export const QUALITY_INCREASE_DOUBLE = 7;
export const QUALITY_INCREASE_REGULAR = 6;

export function getShopWithItem(name: string, sellIn: number, quality: number) {
    const myItemFactory = new ItemFactory(
        [
            new AgedBrie("x", 1, 1),
            new ConcertTicket("x", 1, 1),
            new Sulfuras("x", 1, 1)
        ],
        new NormalItem("x", 1, 1)
    );
    return new Shop(myItemFactory.create([new Item(name, sellIn, quality)]));
}