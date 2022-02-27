import { Item, Shop } from "../gilded_rose";

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

export function getShopWithItem(name:string, sellIn:number, quality:number){
    return new Shop([new Item(name, sellIn, quality)]);
}