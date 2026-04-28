import { test, expect } from "@playwright/test";

test("TC1.19 - search for transportation by province", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // เลือก province
  await page.locator("select").nth(1).selectOption({ label: "Bangkok" });

  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(/Bangkok/i).first()).toBeVisible({ timeout: 15000 });
});