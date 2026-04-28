import { test, expect } from "@playwright/test";

test("TC1.11 - delete a transportation booking", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  const departureText = page.getByText(/departure :/i);
  const bookingCount = await departureText.count();
  await expect(departureText.first()).toBeVisible();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Are you sure you want to remove this transport booking?");
    await dialog.accept();
  });

  // booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  // transportation booking
  await page.getByRole("button", { name: "Delete" }).first().click();

  // booking
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByRole("button", { name: "Save" })).not.toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("button", { name: "Saving" })).not.toBeVisible({ timeout: 15000 });

  expect(await departureText.count()).toBe(bookingCount - 1);
});