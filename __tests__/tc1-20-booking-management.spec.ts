import { test, expect } from "@playwright/test";

test("TC1.20 - admin can view bookings with transportation on booking page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("All Bookings")).toBeVisible({ timeout: 15000 });
});