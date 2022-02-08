import { Shop, Item } from "../gilded_rose";

const ITEM_NAME_DEFAULT = "foo";
const ITEM_NAME_CONCERT_TICKET = "Backstage passes to a TAFKAL80ETC concert";
const ITEM_NAME_CONJURED = "Conjured";
const ITEM_NAME_SULFURAS = "Sulfuras, Hand of Ragnaros";
const ITEM_NAME_AGED_BRIE = "Aged Brie";

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

describe("Each item added to a store", () => {
  it("has a sell-in and quality value", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE)]);

    const foo = gildedRose.items[0];

    expect(foo.name).toEqual(ITEM_NAME_DEFAULT);
    expect(foo.sellIn).toEqual(SELL_IN_POSITIVE);
    expect(foo.quality).toEqual(QUALITY_POSITIVE);
  });
});

describe("At the end of each day the system decreases the quality", () => {
  it("of an item by 1 unless specified differently", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_DECREASE_REGULAR);
  });

  it("of an item twice as fast once the sell-in date of the items passed, ", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_PASSED, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_DECREASE_DOUBLE);
  });

  it("yet the quality can never become negative", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_SOME_VALUE, QUALITY_ZERO)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(QUALITY_ZERO);
  });
});

xdescribe("Some items can be more susceptible to quality degrading:", () => {
  it("'Conjured' items degrade in quality twice as fast as normal items", () => {

    const gildedRose = new Shop([new Item(ITEM_NAME_CONJURED, SELL_IN_POSITIVE, QUALITY_POSITIVE), new Item(ITEM_NAME_CONJURED, SELL_IN_PASSED, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const conjured = gildedRose.items[0];
    const conjuredExpired = gildedRose.items[1];

    expect(conjured.quality).toEqual(QUALITY_DECREASE_DOUBLE);
    expect(conjuredExpired.quality).toEqual(QUALITY_DECREASE_QUADRUPLE);
  });
});

describe("At the end of each day the system decreases the sell-in value", () => {
  it("of any item by 1", () => {
    const gildedRose = new Shop([
      new Item(ITEM_NAME_DEFAULT, SELL_IN_POSITIVE, QUALITY_POSITIVE),
      new Item(ITEM_NAME_AGED_BRIE, SELL_IN_POSITIVE, QUALITY_POSITIVE),
      new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_POSITIVE, QUALITY_POSITIVE),
      new Item(ITEM_NAME_CONJURED, SELL_IN_POSITIVE, QUALITY_POSITIVE),
    ]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];
    const agedBrie = gildedRose.items[1];
    const backstagePasses = gildedRose.items[2];
    const conjured = gildedRose.items[3];

    expect(foo.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
    expect(agedBrie.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
    expect(backstagePasses.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
    expect(conjured.sellIn).toEqual(SELL_IN_DECREASE_REGULAR);
  });

  it("yet legendary items such as 'Sulfuras', never have to be sold so their sell-in does not change", () => {

    const gildedRose = new Shop([new Item(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80)]);

    gildedRose.updateQuality();
    const sulfuras = gildedRose.items[0];

    expect(sulfuras.sellIn).toEqual(SELL_IN_SULFURAS_LEGENDARY_FIXED);
  });
});

describe("For some special items such as 'Backstage passes to a TAFKAL80ETC concert'", () => {
  it("the quality increases by 1 as its sell-in value approaches but is still more than 10 days", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_ABOVE_TEN, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const backstagePasses = gildedRose.items[0];

    expect(backstagePasses.quality).toEqual(QUALITY_INCREASE_REGULAR);
  });

  it("the quality increases by 2 as its sell-in value approaches and is 10 to 6 days", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_TEN_TO_SIX, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const backstagePasses = gildedRose.items[0];

    expect(backstagePasses.quality).toEqual(QUALITY_INCREASE_DOUBLE);
  });

  it("the quality increases by 3 as its sell-in value approaches and is 5 to 1 days", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_FIVE_TO_ONE, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const backstagePasses = gildedRose.items[0];

    expect(backstagePasses.quality).toEqual(QUALITY_INCREASE_TRIPLE);
  });
  it("yet the quality drops 0 after the concert", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_PASSED, QUALITY_MAXIMUM_50)]);

    gildedRose.updateQuality();
    const backstagePasses = gildedRose.items[0];

    expect(backstagePasses.quality).toEqual(QUALITY_ZERO);
  });
});

describe("For other special items, such as 'Aged Brie'", () => {
  it("the quality increase the older the item gets", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_AGED_BRIE, SELL_IN_SOME_VALUE, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const agedBrie = gildedRose.items[0];

    expect(agedBrie.quality).toEqual(QUALITY_INCREASE_REGULAR);
  });

  it("the quality increase twice as fast when the item expired", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_AGED_BRIE, SELL_IN_PASSED, QUALITY_POSITIVE)]);

    gildedRose.updateQuality();
    const agedBrie = gildedRose.items[0];

    expect(agedBrie.quality).toEqual(QUALITY_INCREASE_DOUBLE);
  });

  it("yet the quality of any item can increase max to 50", () => {

    const gildedRose = new Shop([new Item(ITEM_NAME_AGED_BRIE, SELL_IN_SOME_VALUE, QUALITY_MAXIMUM_50), new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_FIVE_TO_ONE, QUALITY_MAXIMUM_50)]);

    gildedRose.updateQuality();
    const agedBrie = gildedRose.items[0];
    const backstagePasses = gildedRose.items[1];

    expect(agedBrie.quality).toEqual(QUALITY_MAXIMUM_50);
    expect(backstagePasses.quality).toEqual(QUALITY_MAXIMUM_50);
  });
});

describe("Some items can be legendary, remain unaffected by any changes to sell-in and quality and even can have out-of-the limits qualities", () => {
  it("Sulfuras, being a legendary item, never has to be sold or changes its fixed quality of 80", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_SULFURAS, SELL_IN_SULFURAS_LEGENDARY_FIXED, QUALITY_SULFURAS_LEGENDARY_FIXED_80)]);

    gildedRose.updateQuality();
    const sulfuras = gildedRose.items[0];

    expect(sulfuras.sellIn).toEqual(SELL_IN_SULFURAS_LEGENDARY_FIXED);
    expect(sulfuras.quality).toEqual(QUALITY_SULFURAS_LEGENDARY_FIXED_80);
  });
});
