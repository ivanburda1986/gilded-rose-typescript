import {Shop} from "./gilded_rose";
import {Item} from "./item";
import {AgedBrieStrategy} from "./agedBrie/agedBrieStrategy";
import {ConcertTicketStrategy} from "./concertTicket/concertTicketStrategy";
import {SulfurasStrategy} from "./sulfuras/sulfurasStrategy";
import {NormalItemStrategy} from "./normalItem/normalItemStrategy";
import {ConjuredStrategy} from "./conjured/conjuredStrategy";

export function getShopWithItem(name: string, sellIn: number, quality: number){
    return new Shop([new Item(name, sellIn, quality)], [new AgedBrieStrategy(),new ConcertTicketStrategy(),  new SulfurasStrategy(), new ConjuredStrategy() ], new NormalItemStrategy());
}

export const SELL_IN_POSITIVE = 5;
export const SELL_IN_DECREASE_REGULAR = 4;
export const SELL_IN_EXPIRED = 0;

export const QUALITY_MINIMUM = 0;
export const QUALITY_POSITIVE = 5;
export const QUALITY_MAXIMUM = 50;

export const QUALITY_INCREASE_REGULAR = 6;
export const QUALITY_INCREASE_DOUBLE = 7;
export const QUALITY_DECREASE_REGULAR = 4;
export const QUALITY_DECREASE_DOUBLE = 3;
export const QUALITY_DECREASE_QUADRUPLE = 1;

