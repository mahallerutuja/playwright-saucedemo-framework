import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly cartIcon: Locator;

  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.cartIcon = page.locator(".shopping_cart_link");

    this.checkoutButton = page.locator("#checkout");
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyBadgeCount(expectedCount: string) {
    await expect(this.page.locator(".shopping_cart_badge")).toHaveText(
      expectedCount,
    );
  }
}
