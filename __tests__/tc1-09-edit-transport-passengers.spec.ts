import { test, expect } from "@playwright/test";

test("TC1.09 - edit an existing booking by updating number of passengers", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  // booking
  await page.getByRole("button", { name: "Edit" }).first().click();
  
  // transportation booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  await page.locator('input[type="number"]').nth(1).fill("2");

  // transportation booking
  await page.getByRole("button", { name: "Save" }).first().click();
  
  // booking
  await page.getByRole("button", { name: "Save" }).first().click();

  await expect(page.getByText(/Passengers : 2/i).first()).toBeVisible({ timeout: 15000 });
});