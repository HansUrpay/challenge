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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItem(item);

      if (item.name !== "Sulfuras") {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    }

    return this.items;
  }

  private updateItem(item: Item): void {
    const handlers = {
      "Aged Brie": this.updateAgedBrie,
      "Backstage passes": this.updateBackstagePasses,
      Conjured: this.updateConjured,
      Sulfuras: () => {},
    };

    const handler =
      handlers[item.name as keyof typeof handlers] || this.updateNormalItem;

    handler.call(this, item);
  }

  private updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  private updateBackstagePasses(item: Item) {
    if (item.quality < 50) {
      item.quality++;

      if (item.sellIn <= 10 && item.quality < 50) {
        item.quality++;
      }

      if (item.sellIn <= 5 && item.quality < 50) {
        item.quality++;
      }

      if (item.sellIn <= 0) {
        item.quality = 0;
      }
    }
  }

  private updateConjured(item: Item) {
    if (item.quality > 0) {
      item.quality = Math.max(0, item.quality - 2);
    }
  }

  private updateNormalItem(item: Item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  private handleExpiredItem(item: Item) {
    switch (item.name) {
      case "Aged Brie":
        this.increaseQuality(item);
        break;

      case "Backstage passes":
        item.quality = 0;
        break;

      case "Conjured":
        this.decreaseQuality(item, 2);
        break;

      default:
        if (item.quality > 0 && item.name !== "Sulfuras") {
          this.decreaseQuality(item);
        }
    }
  }

  private increaseQuality(item: Item, amount = 1) {
    item.quality = Math.min(50, item.quality + amount);
  }

  private decreaseQuality(item: Item, amount = 1) {
    item.quality = Math.max(0, item.quality - amount);
  }
}
