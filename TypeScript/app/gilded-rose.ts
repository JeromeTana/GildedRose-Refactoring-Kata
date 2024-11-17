export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  MIN_QUALITY = 0;
  MAX_QUALITY = 50;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  increaseQuality(item: Item, number: number = 1) {
    if (item.quality + number <= this.MAX_QUALITY) {
      item.quality += number;
      return;
    }
    item.quality = this.MAX_QUALITY;
  }

  decreaseQuality(item: Item, number: number = 1) {
    if (item.quality - number >= this.MIN_QUALITY) {
      item.quality -= number;
      return;
    }
    item.quality = this.MIN_QUALITY;
  }

  isDue(item: Item) {
    return item.sellIn < 0;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name.includes("Sulfuras")) {
        continue;
      }

      item.sellIn--;

      switch (true) {
        case item.name.includes("Aged Brie"):
          this.increaseQuality(item);
          this.isDue(item) && this.increaseQuality(item);
          break;
        case item.name.includes("Backstage passes"):
          if (this.isDue(item)) {
            item.quality = this.MIN_QUALITY;
            break;
          }
          this.increaseQuality(item);
          item.sellIn < 11 && this.increaseQuality(item);
          item.sellIn < 6 && this.increaseQuality(item);
          break;
        case item.name.includes("Conjured"):
          this.decreaseQuality(item, 2);
          this.isDue(item) && this.decreaseQuality(item, 2);
          break;
        default:
          this.decreaseQuality(item);
          this.isDue(item) && this.decreaseQuality(item);
          break;
      }
    }

    return this.items;
  }
}
