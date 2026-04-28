import { test, expect } from "@playwright/test";

test("TC1.21 - add a transportation with valid departure date and passenger count", async ({ page }) => {
  const hotelId = "69c16f5e699eaa901a4af472";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await page.getByText("Add new booking").click();

  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Book" }).first().click();

  await page.locator('input[type="datetime-local"]').fill("2026-04-16T13:38");
  await page.locator('input[type="number"]').fill("2");

  await page.getByRole("button", { name: "Confirm Add" }).click();

  await expect(page.getByText(/Departure :/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/Passengers :/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/Passengers : 2/i)).toBeVisible({ timeout: 15000 });
});