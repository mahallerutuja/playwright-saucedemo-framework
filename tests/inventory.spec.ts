import { test, expect } from "../src/fixtures/testFixture";
import { config } from "../config/config";

test("Verify Product Count @smoke @regression @inventory", async ({
  loginPage,
  inventoryPage,
}) => {
  await loginPage.openApplication();

  await loginPage.loginAsStandardUser();

  await inventoryPage.verifyProductCount(6);
});
test("Verify Product Details @regression @inventory", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.verifyAllProductsDetails();
});
test("Verify Product Price Format @regression @inventory", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  const prices = await inventoryPage.getProductPrices();

  prices.forEach((price) => {
    expect(price).toBeGreaterThan(0);
  });
});
test("Verify Product Detail Page @smoke @regression @inventory", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.openBackpackDetails();

  await inventoryPage.verifyProductDetailPageOpened();
});
test("Sort Products A to Z @regression @sorting", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  const actualProducts = await inventoryPage.getProductNames();

  const expectedProducts = [...actualProducts].sort();

  expect(actualProducts).toEqual(expectedProducts);
});
test("Sort Products Z to A @regression @sorting", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.sortZA();

  const actualProducts = await inventoryPage.getProductNames();

  const expectedProducts = [...actualProducts].sort().reverse();

  expect(actualProducts).toEqual(expectedProducts);
});
test("Sort Price Low To High @regression @sorting", async ({
  loginPage,
  inventoryPage,
}) => {
  await inventoryPage.openInventory();

  await inventoryPage.sortLowHigh();

  const actualPrices = await inventoryPage.getProductPrices();

  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  expect(actualPrices).toEqual(expectedPrices);
});
