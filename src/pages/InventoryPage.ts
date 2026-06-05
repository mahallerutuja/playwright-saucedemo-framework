import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly productCards: Locator;
  readonly sortingDropdown: Locator;
  readonly backPackAddButton: Locator;
  readonly backPackRemoveButton: Locator;
  readonly cartBadge: Locator;
  readonly backpackProductLink: Locator;
  readonly bikeLightAddButton: Locator;
  readonly onesieAddButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productCards = page.locator(".inventory_item");
    this.sortingDropdown = page.locator(".product_sort_container");
    this.backPackAddButton = page.locator("#add-to-cart-sauce-labs-backpack");
    this.backPackRemoveButton = page.locator("#remove-sauce-labs-backpack");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.backpackProductLink = page.getByText("Sauce Labs Backpack");
    this.bikeLightAddButton = page.locator(
      "#add-to-cart-sauce-labs-bike-light",
    );
    this.onesieAddButton = page.locator("#add-to-cart-sauce-labs-onesie");
  }

  async verifyProductCount(expectedCount: number) {
    await expect(this.productCards).toHaveCount(expectedCount);
  }

  async verifyAllProductsDetails() {
    const count = await this.productCards.count();

    for (let i = 0; i < count; i++) {
      const product = this.productCards.nth(i);
      await expect(product.locator(".inventory_item_name")).toBeVisible();
      await expect(product.locator(".inventory_item_desc")).toBeVisible();
      await expect(product.locator(".inventory_item_price")).toBeVisible();
      await expect(product.locator(".btn")).toBeVisible();
      await expect(product.locator("img")).toBeVisible();
    }
  }

  async openInventory() {
    await this.navigate("/inventory.html");
  }

  async addBackpack() {
    await this.backPackAddButton.click();
  }

  async removeBackpack() {
    await this.backPackRemoveButton.click();
  }

  async sortZA() {
    await this.sortingDropdown.selectOption("za");
  }

  async sortLowHigh() {
    await this.sortingDropdown.selectOption("lohi");
  }

  async getProductNames() {
    return await this.page.locator(".inventory_item_name").allInnerTexts();
  }

  async getProductPrices() {
    const prices = await this.page
      .locator(".inventory_item_price")
      .allInnerTexts();

    return prices.map((price) => Number(price.replace("$", "")));
  }
  async openBackpackDetails() {
    await this.backpackProductLink.click();
  }

  async verifyProductDetailPageOpened() {
    await expect(this.page).toHaveURL(/inventory-item/);
  }

  async addBikeLight() {
    await this.bikeLightAddButton.click();
  }

  async addOnesie() {
    await this.onesieAddButton.click();
  }
}
