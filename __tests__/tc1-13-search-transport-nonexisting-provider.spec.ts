import { test, expect } from "@playwright/test";

test("TC1.13 - search for transportation by non-existing provider name", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const fakeProvider = "ZZZ_NO_PROVIDER_12345";

  await page.getByPlaceholder("Provider Name").fill(fakeProvider);

  // รอ debounce + fetch
  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("No results found")).toBeVisible({ timeout: 15000 });
});