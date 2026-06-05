import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../../config/config";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }
  async openApplication() {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login(
      config.users.standard.username,
      config.users.standard.password,
    );
  }
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory/);
  }
}
