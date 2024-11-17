import { Item, GildedRose } from "@/gilded-rose";

describe("Conjured", () => {
  it("Conjured should decrement sellIn and quality, quality decreased twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(8);
  });

  it("Quality of Conjured with sellIn less than 0 should decreased four times faster than other item", () => {
    const gildedRose = new GildedRose([new Item("Conjured of dragon", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(6);
  });

  it("Quality of Conjured item should not be negative", () => {
    const gildedRose = new GildedRose([new Item("Conjured", -1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Sulfuras", () => {
  it("Sulfuras should not decrement sellIn and quality and quality always 80", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(80);
  });
});

describe("Aged Brie", () => {
  it("Aged Brie should increment quality and decrement sellIn", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie, of ODT", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(11);
  });

  it("Quality of Aged Brie should not be more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Quality of Aged Brie should increased by 2 when sellIn less than 0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });
});

describe("Backstage passes", () => {
  it("Backstage passes should increment quality and decrement sellIn", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(11);
  });

  it("Backstage passes should increment quality by 2 when sellIn is less than 10", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  });

  it("Backstage passes should increment quality by 3 when sellIn is less than 5", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(13);
  });

  it("Backstage passes should have quality 0 when sellIn is less than 0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Quality of Backstage passes with sellIn less than 11 should not be more than 50", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Quality of Backstage passes with sellIn less than 6 should not be more than 50", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("Quality of Backstage passes with sellIn less than 0 should not be negative", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 5),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Other Item", () => {
  it("Quality of other item with sellIn less than 0 should decreased by 2", () => {
    const gildedRose = new GildedRose([new Item("foo", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("Quality of other item should not be negative", () => {
    const gildedRose = new GildedRose([new Item("foo", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Quality of  other item with sellIn less than 0 should decreased twice as fast", () => {
    const gildedRose = new GildedRose([new Item("foo", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(8);
  });
});

describe("Common case", () => {
  it("No items", () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length === 0);
  });
});
