import { test, expect } from "@playwright/test";

test("TC1.05 - add a transportation with a missing departure date", async ({ page }) => {
  const hotelId = "69c16f5e699eaa901a4af472";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await page.getByText("Add new booking").click();

  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Book" }).first().click();

  // ไม่กรอก departure date
  await page.locator('input[type="number"]').fill("2");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Please fill in departure date");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Confirm Add" }).click();
});