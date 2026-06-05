import { test, expect } from "@playwright/test";
import { config } from "../config/config";

test("Authenticate User", async ({ page }) => {
  await page.goto(config.baseUrl);

  await page.locator("#user-name").fill(config.users.standard.username);

  await page.locator("#password").fill(config.users.standard.password);

  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: ".auth/user.json",
  });
});
