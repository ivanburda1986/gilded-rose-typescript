import {Shop} from "./gilded_rose";
import {Item} from "./item";

export function getShopWithItem(name: string, sellIn: number, quality: number){
    return new Shop([new Item(name, sellIn, quality)]);
}
export const SELL_IN_POSITIVE = 5;
export const SELL_IN_DECREASE_REGULAR = 4;
export const SELL_IN_EXPIRED = 0;

export const QUALITY_MINIMUM = 0;
export const QUALITY_POSITIVE = 5;
export const QUALITY_MAXIMUM = 50;

export const QUALITY_INCREASE_REGULAR = 6;
export const QUALITY_DECREASE_REGULAR = 4;
export const QUALITY_DECREASE_DOUBLE = 3;

