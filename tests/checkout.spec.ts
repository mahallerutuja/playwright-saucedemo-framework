import { test, expect } from "../src/fixtures/testFixture";
import { config } from "../config/config";

test("Successful Checkout @smoke @regression @checkout", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.addBackpack();

  await cartPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.enterCustomerDetails("Rutuja", "Mahalle", "444604");

  await checkoutPage.completeCheckout();

  await checkoutPage.verifyOrderPlaced();
});
test("Verify Order Summary @smoke @regression @checkout", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.addBackpack();

  await cartPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.enterCustomerDetails("Rutuja", "Mahalle", "444604");

  await expect(checkoutPage.productName).toHaveText("Sauce Labs Backpack");

  await expect(checkoutPage.productPrice).toHaveText("$29.99");

  await expect(checkoutPage.itemTotalLabel).toContainText("Item total");

  await expect(checkoutPage.taxLabel).toContainText("Tax");

  await expect(checkoutPage.totalLabel).toContainText("Total");
});
