export const ITEM_NAME_DEFAULT = "foo";

export const SELL_IN_ABOVE_TEN = 11;
export const SELL_IN_TEN_TO_SIX = 10;
export const SELL_IN_FIVE_TO_ONE = 5;

export const SELL_IN_SOME_VALUE = 999;
export const SELL_IN_POSITIVE = 5;
export const SELL_IN_DECREASE_REGULAR = 4;
export const SELL_IN_PASSED = 0;
export const SELL_IN_SULFURAS_LEGENDARY_FIXED = 999;

export const QUALITY_ZERO = 0;
export const QUALITY_POSITIVE = 5;
export const QUALITY_DECREASE_REGULAR = 4;
export const QUALITY_DECREASE_DOUBLE = 3;
export const QUALITY_DECREASE_QUADRUPLE = 1;
export const QUALITY_INCREASE_REGULAR = 6;
export const QUALITY_INCREASE_DOUBLE = 7;
export const QUALITY_INCREASE_TRIPLE = 8;
export const QUALITY_MAXIMUM_50 = 50;
export const QUALITY_SULFURAS_LEGENDARY_FIXED_80 = 80;

interface getShopWithItemInterface {
    name: string;
    sellIn: number;
    quality: number;
}
export const getShopWithItem  = ({name, sellIn, quality}:getShopWithItemInterface)=>{
    return true;
}