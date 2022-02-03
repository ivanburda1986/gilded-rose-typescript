export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    const decreaseQuality = ({ item, decrement = 1 }: { item: Item; decrement?: number }): number => {
      if (item.sellIn < 0 && item.quality >= 2 * decrement) {
        return (item.quality -= 2 * decrement);
      }
      if (item.quality >= decrement) {
        return (item.quality -= decrement);
      }
      return 0;
    };
    const decreaseSellIn = (item: Item): number => {
      return (item.sellIn = item.sellIn - 1);
    };
    const increaseQuality = ({ item, increment }: { item: Item; increment: number }): number => {
      if (item.quality < 50) {
        return (item.quality += increment);
      }
      return 50;
    };

    this.items.forEach((item) => {
      switch (item.name) {
        case "Aged Brie":
          item.sellIn = decreaseSellIn(item);
          item.quality = increaseQuality({ item, increment: 1 });
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn = decreaseSellIn(item);
          if (item.sellIn < 0) {
            item.quality = 0;
            break;
          }
          if (item.sellIn <= 5 && item.sellIn > 0) {
            item.quality = increaseQuality({ item, increment: 3 });
            break;
          }
          if (item.sellIn <= 10 && item.sellIn > 0) {
            item.quality = increaseQuality({ item, increment: 2 });
            break;
          }
          item.quality = increaseQuality({ item, increment: 1 });
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Conjured":
          item.sellIn = decreaseSellIn(item);
          item.quality = decreaseQuality({ item, decrement: 2 });
          break;
        default:
          item.sellIn = decreaseSellIn(item);
          item.quality = decreaseQuality({ item, decrement: 1 });
          break;
      }
    });
    return this.items;
  }
}
