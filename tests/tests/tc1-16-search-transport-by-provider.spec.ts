import { test, expect } from "@playwright/test";

test("TC1.16 - search for transportation by existing provider name", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("Provider Name").fill("Thai Sky");

  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(/Thai Sky/i).first()).toBeVisible({ timeout: 15000 });
});