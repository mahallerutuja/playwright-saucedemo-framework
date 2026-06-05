import { test, expect } from "../src/fixtures/testFixture";
import { config } from "../config/config";

test("Add Single Product To Cart @smoke @regression @cart", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.addBackpack();

  await cartPage.verifyBadgeCount("1");
});
test("Add Multiple Products To Cart @regression @cart", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.openInventory();
  await inventoryPage.addBackpack();
  await inventoryPage.addBikeLight();
  await inventoryPage.addOnesie();
  await cartPage.verifyBadgeCount("3");
});

test("Remove Product From Cart @regression @cart", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();
  await inventoryPage.addBackpack();
  await inventoryPage.removeBackpack();
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});
