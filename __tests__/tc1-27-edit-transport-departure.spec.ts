import { test, expect } from "@playwright/test";

test("TC1.27 - edit an existing booking by updating departure date", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: "Edit" }).nth(1).click();

  const newDeparture = "2026-04-16T15:45";
  await page.locator('input[type="datetime-local"]').fill(newDeparture);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText(/Departure :/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/4\/16\/2026/i)).toBeVisible({ timeout: 15000 });
});