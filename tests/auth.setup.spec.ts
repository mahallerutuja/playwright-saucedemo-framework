import { expect, test } from "@playwright/test";
import { config } from "../config/config";

test("Authenticate User", async ({ page }) => {
  console.log("BASE URL:", config.baseUrl);
  console.log("USERNAME:", config.users.standard.username);
  console.log("PASSWORD EXISTS:", !!config.users.standard.password);

  await page.goto(config.baseUrl);

  await page.locator("#user-name").fill(config.users.standard.username);
  await page.locator("#password").fill(config.users.standard.password);

  await page.locator("#login-button").click();

  console.log("Current URL:", page.url());

  const errorMessage = await page
    .locator('[data-test="error"]')
    .textContent()
    .catch(() => null);

  console.log("Login Error:", errorMessage);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: ".auth/user.json",
  });
});
