import { test, expect } from "@playwright/test";

test("TC1.27 - edit an existing booking by updating departure date", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation").first()).toBeVisible({ timeout: 15000 });

  // booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  // transportation booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  const newDeparture = "2026-04-16T15:45";
  await page.locator('input[type="datetime-local"]').fill(newDeparture);

  // transportation booking
  await page.getByRole("button", { name: "Save" }).first().click();

  // booking
  await page.getByRole("button", { name: "Save" }).first().click();

  await expect(page.getByText(/Departure :/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/4\/16\/2026/i).first()).toBeVisible({ timeout: 15000 });
});