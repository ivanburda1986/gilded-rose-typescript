import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", () => {
  it("should add a new item", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const addedItem = gildedRose.items[0];
    expect(addedItem.name).toEqual("foo");
    expect(addedItem.sellIn).toEqual(1);
    expect(addedItem.quality).toEqual(1);
  });

  it("should degrade the quality of a regular item", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.quality).toEqual(0);
  });

  it("should never increase quality of an item above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.quality).toEqual(50);
  });

  it("should never change the quality of Sulfuras, Hand of Ragnaros which is constantly 80", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.quality).toEqual(80);
  });

  it("should twice as fast degrade the quality and decrease the sellIn of a regular item for which the sell by date has elapsed", () => {
    const gildedRose = new Shop([new Item("foo", 0, 4)]);
    const addedItem = gildedRose.items[0];
    gildedRose.updateQuality();
    expect(addedItem.sellIn).toEqual(-1);
    expect(addedItem.quality).toEqual(2);
  });
});
