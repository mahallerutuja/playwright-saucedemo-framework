import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly finishButton: Locator;

  readonly successMessage: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator("#first-name");

    this.lastNameInput = page.locator("#last-name");

    this.postalCodeInput = page.locator("#postal-code");

    this.continueButton = page.locator("#continue");

    this.finishButton = page.locator("#finish");

    this.successMessage = page.locator(".complete-header");
    this.productName = page.locator(".inventory_item_name");

    this.productPrice = page.locator(".inventory_item_price");

    this.itemTotalLabel = page.locator(".summary_subtotal_label");

    this.taxLabel = page.locator(".summary_tax_label");

    this.totalLabel = page.locator(".summary_total_label");
  }

  async openCheckout() {
    await this.navigate("/checkout-step-one.html");
  }

  async enterCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.fill(lastName);

    await this.postalCodeInput.fill(postalCode);

    await this.continueButton.click();
  }

  async completeCheckout() {
    await this.finishButton.click();
  }

  async verifyOrderPlaced() {
    await expect(this.successMessage).toHaveText("Thank you for your order!");
  }
}
