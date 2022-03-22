import {Item, Shop} from "./gilded_rose";

export function getShopWithItem(name: string, sellIn: number, quality: number){
    return new Shop([new Item(name, sellIn, quality)]);
}

export const SELL_IN_DECREASE_REGULAR = 4;
export const SELL_IN_EXPIRED = 0;


export const QUALITY_ZERO = 0;
export const QUALITY_DECREASE_REGULAR = 4;
export const QUALITY_DECREASE_DOUBLE = 3;

