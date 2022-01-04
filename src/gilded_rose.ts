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

  updateQualityRefactored() {
    const decreaseQuality = (item: Item): number => {
      if (item.quality > 1 && item.sellIn < 0) {
        return (item.quality -= 2);
      }
      if (item.quality > 0) {
        return (item.quality -= 1);
      }
      return 0;
    };
    const decreaseSellIn = (item: Item): number => {
      if (item.sellIn > 0) {
        return (item.sellIn -= 1);
      }
      return 0;
    };
    const increaseQuality = ({ item, speed }: { item: Item; speed: number }): number => {
      if (item.quality < 50) {
        return (item.quality += speed);
      }
      return 50;
    };

    this.items.forEach((item) => {
      //Handle "Aged Brie"
      switch (item.name) {
        case "Aged Brie":
          item.quality = increaseQuality({ item, speed: 1 });
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn < 11 && item.sellIn > 0) {
            item.quality = increaseQuality({ item, speed: 2 });
          }
          if (item.sellIn < 6 && item.sellIn > 0) {
            item.quality = increaseQuality({ item, speed: 3 });
          }
          if (item.sellIn <= 0) {
            item.quality = 0;
          }
          item.quality = increaseQuality({ item, speed: 1 });
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          item.quality = decreaseQuality(item);
          item.sellIn = decreaseSellIn(item);
          return;
      }
    });
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      //For all items except of: Aged Brie, Backstage
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].quality > 0) {
          //If their quality is above 0
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // And they are not Sulfuras
            this.items[i].quality = this.items[i].quality - 1; //Decrease the quality by -1
          }
        }
      } else {
        //For Aged Brie and Backstage if their quality is below 50
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1; //Increase the quality by 1
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            //And for Backgstage:
            if (this.items[i].sellIn < 11) {
              //If its sellIn is <11
              if (this.items[i].quality < 50) {
                //and its quality <50, increase its quality +1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              //And if its sellIn is <6
              if (this.items[i].quality < 50) {
                //and its quality <50, increase its quality +1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      //For all items except of: Sulfuras
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1; //Decrease their sellIn by -1
      }
      if (this.items[i].sellIn < 0) {
        //If the item's sellIn is <0, i.e. it has elapse
        if (this.items[i].name != "Aged Brie") {
          //And if the item is not Aged Brie
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            //And the item is not Backstage
            if (this.items[i].quality > 0) {
              //And its quality is >0
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                //And the items is not Sulfuras
                this.items[i].quality = this.items[i].quality - 1; // Decrease the items quality by -1 -> the quality is decreasing twice as fast
              }
            }
          } else {
            // But the item is Backstage
            this.items[i].quality = this.items[i].quality - this.items[i].quality; //Set the items quality to 0
          }
        } else {
          //But if the item is not "Aged Brie"
          if (this.items[i].quality < 50) {
            //And its qualit is <50
            this.items[i].quality = this.items[i].quality + 1; //Increase its quality
          }
        }
      }
    }

    return this.items;
  }
}
