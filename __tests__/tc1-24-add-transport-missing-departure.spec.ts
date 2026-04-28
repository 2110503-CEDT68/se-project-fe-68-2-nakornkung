import { test, expect } from "@playwright/test";

test("TC1.24 - add a transportation with a missing departure date", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // booking
  await page.getByRole("button", { name: "Edit" }).first().click();
  await page.getByText("Add new booking").click();

  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Book" }).first().click();

  // ไม่กรอก departure date
  await page.locator('input[type="number"]').nth(1).fill("2");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Please fill in departure date");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Confirm Add" }).click();
});