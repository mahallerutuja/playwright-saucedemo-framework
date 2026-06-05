import { test, expect } from "../src/fixtures/testFixture";
import { config } from "../config/config";

test.use({
  storageState: undefined,
});

test("TC01 Verify Successful Login @smoke @regression @login", async ({
  loginPage,
}) => {
  await loginPage.openApplication();

  await loginPage.login(
    config.users.standard.username,
    config.users.standard.password,
  );

  await loginPage.verifySuccessfulLogin();
});
test("TC02 Verify Invalid Username @regression @negative @login", async ({
  loginPage,
}) => {
  await loginPage.openApplication();

  await loginPage.login(
    config.users.invalid.username,
    config.users.invalid.password,
  );

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
