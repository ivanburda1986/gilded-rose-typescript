import { Shop, Item } from "../gilded_rose";
const ITEM_NAME_DEFAULT = "foo";
const ITEM_NAME_CONCERT_TICKET = "Backstage passes to a TAFKAL80ETC concert";

const SELL_IN_EXPIRING = 0;
const SELL_IN_NOT_EXPIRED = 1;

const QUALITY_EXPIRED = 0;
const QUALITY_NOT_EXPIRED = 1;
const QUALITY_2 = 2;
const QUALITY_MAXIMUM = 50;

describe("Add a new item to the store", () => {
  it("should add a new item", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_NOT_EXPIRED, QUALITY_NOT_EXPIRED)]);

    const foo = gildedRose.items[0];

    expect(foo.name).toEqual(ITEM_NAME_DEFAULT);
    expect(foo.sellIn).toEqual(1);
    expect(foo.quality).toEqual(1);
  });
});

describe("Decreasing of quality", () => {
  it("should decrease the quality of a regular item", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_NOT_EXPIRED, QUALITY_NOT_EXPIRED)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(0);
  });

  it("should never decrease the quality to be negative", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_NOT_EXPIRED, QUALITY_EXPIRED)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(0);
  });

  it("should twice as fast decrease the quality of a regular item for which the sell by date has passed", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, SELL_IN_EXPIRING, QUALITY_2)]);

    gildedRose.updateQuality();
    const foo = gildedRose.items[0];

    expect(foo.quality).toEqual(0);
  });

  it("should set the quality of 'Backstage passes to a TAFKAL80ETC concert' to 0 when its sellIn is 0 days or lower", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_CONCERT_TICKET, SELL_IN_EXPIRING, QUALITY_MAXIMUM)]);

    gildedRose.updateQuality();
    const backstagePasses = gildedRose.items[0];

    expect(backstagePasses.quality).toEqual(0);
  });

  it("should decrease the quality of Conjured items twice as fast as of regular items", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, 1, 4), new Item("Conjured", 1, 4), new Item(ITEM_NAME_DEFAULT, 0, 4), new Item("Conjured", 0, 4)]);
    const foo = gildedRose.items[0];
    const conjured = gildedRose.items[1];
    const fooExpired = gildedRose.items[2];
    const conjuredExpired = gildedRose.items[3];
    gildedRose.updateQuality();
    expect(foo.sellIn).toEqual(0);
    expect(foo.quality).toEqual(3);
    expect(conjured.sellIn).toEqual(0);
    expect(conjured.quality).toEqual(2);
    expect(fooExpired.sellIn).toEqual(-1);
    expect(fooExpired.quality).toEqual(2);
    expect(conjuredExpired.sellIn).toEqual(-1);
    expect(conjuredExpired.quality).toEqual(0);
  });
});

describe("Increasing of quality", () => {
  it("should increase the quality of Aged Brie as it ages", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    const agedBrie = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(agedBrie.sellIn).toEqual(-1);
    expect(agedBrie.quality).toEqual(11);
  });

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 1 as it ages as long as its sellIn is 11 days or more", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 5)]);
    const backstagePasses = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(backstagePasses.sellIn).toEqual(11);
    expect(backstagePasses.quality).toEqual(6);
  });

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 2 as it ages as long as its sellIn is 10 to 6 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5)]);
    const backstagePasses = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(backstagePasses.sellIn).toEqual(10);
    expect(backstagePasses.quality).toEqual(7);
  });

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 3 as it ages as long as its sellIn is 5 to 1 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)]);
    const backstagePasses = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(backstagePasses.sellIn).toEqual(5);
    expect(backstagePasses.quality).toEqual(8);
  });

  it("should never increase quality of an item above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const agedBrie = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(agedBrie.quality).toEqual(50);
  });
});

describe("Never changing the quality", () => {
  it("should never change the quality of Sulfuras, Hand of Ragnaros which is constantly 80", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const sulfuras = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(sulfuras.quality).toEqual(80);
  });
});

describe("Decreasing of the sellIn", () => {
  it("should decrease the sellIn of any item except of Sulfuras, Hand of Ragnaros", () => {
    const gildedRose = new Shop([new Item(ITEM_NAME_DEFAULT, 1, 10), new Item("Aged Brie", 1, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10), new Item("Conjured", 1, 10), new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const foo = gildedRose.items[0];
    const agedBrie = gildedRose.items[1];
    const backstagePasses = gildedRose.items[2];
    const conjured = gildedRose.items[3];
    const sulfuras = gildedRose.items[4];
    gildedRose.updateQuality();
    expect(foo.sellIn).toEqual(0);
    expect(agedBrie.sellIn).toEqual(0);
    expect(backstagePasses.sellIn).toEqual(0);
    expect(conjured.sellIn).toEqual(0);
    expect(sulfuras.sellIn).toEqual(1);
  });
});
