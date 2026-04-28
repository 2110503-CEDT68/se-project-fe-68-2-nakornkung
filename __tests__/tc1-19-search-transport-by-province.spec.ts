import { test, expect } from "@playwright/test";

test("TC1.19 - search for transportation by province", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // booking
  await page.getByRole("button", { name: "Edit" }).first().click();
  await page.getByText("Add new booking").click();

  // เลือก province
  await page.getByRole("combobox").nth(2).selectOption({ label: "Bangkok" });

  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  await expect(page.getByTitle('Bangkok').first()).toBeVisible({ timeout: 15000 });
});