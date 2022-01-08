import { Shop, Item } from "../gilded_rose";

describe("Add a new item to the store", () => {
  it("should add a new item", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const foo = gildedRose.items[0];
    expect(foo.name).toEqual("foo");
    expect(foo.sellIn).toEqual(1);
    expect(foo.quality).toEqual(1);
  });
});

describe("Decreasing of quality", () => {
  it("should decrease the quality of a regular item", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const foo = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(foo.quality).toEqual(0);
  });

  it("should never decrease the quality to be negative", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const foo = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(foo.quality).toEqual(0);
  });

  it("should twice as fast decrease the quality of a regular item for which the sell by date has passed", () => {
    const gildedRose = new Shop([new Item("foo", 1, 4), new Item("bar", 0, 4)]);
    const foo = gildedRose.items[0];
    const bar = gildedRose.items[1];
    gildedRose.updateQuality();
    expect(foo.sellIn).toEqual(0);
    expect(foo.quality).toEqual(3);
    expect(bar.sellIn).toEqual(-1);
    expect(bar.quality).toEqual(2);
  });

  it("should set the quality of 'Backstage passes to a TAFKAL80ETC concert' to 0 when its sellIn is 0 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 40)]);
    const backstage = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(backstage.sellIn).toEqual(0);
    expect(backstage.quality).toEqual(0);
  });

  it("should decrease the quality of Conjured items twice as fast as of regular items", () => {
    const gildedRose = new Shop([new Item("foo", 1, 4), new Item("Conjured", 1, 4), new Item("foo", 0, 4), new Item("Conjured", 0, 4)]);
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
  it("should increase the quality of Aged Brie as it ages", () => {});

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 1 as it ages as long as its sellIn is 11 days or more", () => {});

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 2 as it ages as long as its sellIn is less than 11 but more than 5 days", () => {});

  it("should increase the quality of 'Backstage passes to a TAFKAL80ETC concert' by 3 as it ages as long as its sellIn is less than 6 but more than 0 days", () => {});

  it("should never increase quality of an item above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.quality).toEqual(50);
  });
});

describe("Never changing the quality", () => {
  it("should never change the quality of Sulfuras, Hand of Ragnaros which is constantly 80", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.quality).toEqual(80);
  });
});

describe("Decreasing of the sellIn", () => {
  it("should decrease the sellIn of any item except of Sulfuras, Hand of Ragnaros", () => {});

  it("should never decrease the sellIn of Sulfuras, Hand of Ragnaros", () => {});
});
