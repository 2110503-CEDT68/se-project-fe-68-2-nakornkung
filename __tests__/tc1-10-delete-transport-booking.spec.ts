import { test, expect } from "@playwright/test";

test("TC1.10 - delete a transportation booking", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // เพิ่ม transport
  await page.getByText("Add new booking").click();
  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Book" }).first().click();
  await page.locator('input[type="datetime-local"]').fill("2026-04-16T13:38");
  await page.locator('input[type="number"]').fill("2");
  await page.getByRole("button", { name: "Confirm Add" }).click();

  const departureText = page.getByText(/departure :/i).first();
  await expect(departureText).toBeVisible();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Are you sure you want to remove this transport booking?");
    await dialog.accept();
  });

  // ปุ่ม Delete แรกมักเป็นของ booking card, ปุ่มที่สองเป็นของ transport booking
  await page.getByRole("button", { name: "Delete" }).first().click();

  await expect(departureText).not.toBeVisible({ timeout: 15000 });
});