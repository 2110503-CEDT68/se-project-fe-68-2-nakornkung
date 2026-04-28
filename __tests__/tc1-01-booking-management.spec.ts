import { test, expect } from "@playwright/test";

test("TC1.01 - user can view bookings with transportation on booking page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });

  await expect(page.getByText("My Bookings")).toBeVisible();

  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation", { exact: true }).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/departure :/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/passengers :/i).first()).toBeVisible({ timeout: 15000 });
});