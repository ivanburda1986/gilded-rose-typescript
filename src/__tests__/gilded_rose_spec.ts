import { Shop} from "../gilded_rose";
import {Item} from "../item";
import {NormalItemStrategy} from "../normalItem";

import {AgedBrieStrategy,ITEM_NAME_AGED_BRIE} from '../agedBrie';
import {ConcertTicketStrategy,ITEM_NAME_CONCERT_TICKET} from '../concertTicket';
import {SulfurasStrategy, ITEM_NAME_SULFURAS } from '../sulfuras';
import {ConjuredStrategy, ITEM_NAME_CONJURED} from '../conjured';

const ITEM_NAME_DEFAULT = "foo";

const SELL_IN_ABOVE_TEN = 11;
const SELL_IN_TEN_TO_SIX = 10;
const SELL_IN_FIVE_TO_ONE = 5;

const SELL_IN_SOME_VALUE = 999;
const SELL_IN_POSITIVE = 5;
const SELL_IN_DECREASE_REGULAR = 4;
const SELL_IN_PASSED = 0;
const SELL_IN_SULFURAS_LEGENDARY_FIXED = 999;

const QUALITY_ZERO = 0;
const QUALITY_POSITIVE = 5;
const QUALITY_DECREASE_REGULAR = 4;
const QUALITY_DECREASE_DOUBLE = 3;
const QUALITY_DECREASE_QUADRUPLE = 1;
const QUALITY_INCREASE_REGULAR = 6;
const QUALITY_INCREASE_DOUBLE = 7;
const QUALITY_INCREASE_TRIPLE = 8;
const QUALITY_MAXIMUM_50 = 50;
const QUALITY_SULFURAS_LEGENDARY_FIXED_80 = 80;

function getShopWithItem(name: string, sellIn: number, quality: number){
  return new Shop([new Item(name, sellIn, quality)], [new AgedBrieStrategy(),new ConcertTicketStrategy(),  new SulfurasStrategy(),  new ConjuredStrategy() ], new NormalItemStrategy());
}

describe("An item added to a store", () => {
  it("has a sell-in and quality value", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE);

    const foo = gildedRose.items[0];

    expect(foo.name).toEqual(ITEM_NAME_DEFAULT);
    expect(foo.sellIn).toEqual(SELL_IN_POSITIVE);
    expect(foo.quality).toEqual(QUALITY_POSITIVE);
  });
});

describe("At the end of each day the system decreases the quality", () => {
  it("of an item by 1 unless specified differently", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_DECREASE_REGULAR);
  });

  it("of an item twice as fast once the sell-in date of the item passed, ", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_PASSED, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_DECREASE_DOUBLE);
  });

  it("yet the quality can never become negative", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_SOME_VALUE, QUALITY_ZERO);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_ZERO);
  });
});

describe("Some items can be more susceptible to quality degrading:", () => {
  it("'Conjured' item degrades in quality twice as fast as normal items", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONJURED, SELL_IN_POSITIVE, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const conjured = gildedRose.items[0];

    expect(conjured.quality).toEqual(QUALITY_DECREASE_DOUBLE);
  });
  it("Expired 'Conjured' item degrade in quality twice as fast as normal expired items", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONJURED, SELL_IN_PASSED, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const conjuredExpired = gildedRose.items[0];

    expect(conjuredExpired.quality).toEqual(QUALITY_DECREASE_QUADRUPLE);
  });
});

describe("At the end of each day the system decreases the sell-in value", () => {
  it("of an item by 1", () => {
    const gildedRose =  getShopWithItem(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE)

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
  });

  it("yet legendary items such as 'Sulfuras', never have to be sold so their sell-in does not change", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80);

    gildedRose.updateQuality();
    const sulfuras = gildedRose.items[0];

    expect(sulfuras.sellIn).toEqual(SELL_IN_SULFURAS_LEGENDARY_FIXED);
  });
});

describe("For some special items such as 'Backstage passes to a TAFKAL80ETC concert'", () => {
  it("the quality increases by 1 as its sell-in value approaches but is still more than 10 days", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_ABOVE_TEN, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const concertTicket = gildedRose.items[0];

    expect(concertTicket.quality).toEqual(QUALITY_INCREASE_REGULAR);
  });

  it("the quality increases by 2 as its sell-in value approaches, and is 10 to 6 days", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_TEN_TO_SIX, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const concertTicket = gildedRose.items[0];

    expect(concertTicket.quality).toEqual(QUALITY_INCREASE_DOUBLE);
  });

  it("the quality increases by 3 as its sell-in value approaches and is 5 to 1 days", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_FIVE_TO_ONE, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const concertTicket = gildedRose.items[0];

    expect(concertTicket.quality).toEqual(QUALITY_INCREASE_TRIPLE);
  });
  it("yet the quality drops 0 after the concert", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_CONCERT_TICKET, SELL_IN_PASSED, QUALITY_MAXIMUM_50);

    gildedRose.updateQuality();
    const concertTicket = gildedRose.items[0];

    expect(concertTicket.quality).toEqual(QUALITY_ZERO);
  });
});

describe("For other special items", () => {
  it("such as 'Aged Brie' the quality increase the older the item gets", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_SOME_VALUE, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const agedBrie = gildedRose.items[0];

    expect(agedBrie.quality).toEqual(QUALITY_INCREASE_REGULAR);
  });

  it("such as 'Aged Brie' the quality increase twice as fast when the item expired", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_PASSED, QUALITY_POSITIVE);

    gildedRose.updateQuality();
    const agedBrie = gildedRose.items[0];

    expect(agedBrie.quality).toEqual(QUALITY_INCREASE_DOUBLE);
  });

  it("the quality of any item can increase, yet max to 50", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_AGED_BRIE, SELL_IN_SOME_VALUE, QUALITY_MAXIMUM_50);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_MAXIMUM_50);
  });
  it("such as Sulfuras, being a legendary item, the fixed quality of 80 never changes", () => {
    const gildedRose = getShopWithItem(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80);

    gildedRose.updateQuality();
    const sulfuras = gildedRose.items[0];

    expect(sulfuras.quality).toEqual(QUALITY_SULFURAS_LEGENDARY_FIXED_80);
  });
});

