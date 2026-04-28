import { test, expect } from "@playwright/test";

test("TC1.28 - edit an existing booking by updating number of passengers", async ({ page }) => {
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

  // เปลี่ยนจำนวนผู้โดยสาร
  await page.locator('input[type="number"]').nth(1).fill("2");

  // transportation booking
  await page.getByRole("button", { name: "Save" }).first().click();

  // booking
  await page.getByRole("button", { name: "Save" }).first().click();

  // เช็กว่าบันทึกแล้ว
  await expect(page.getByText(/Passengers : 2/i).first()).toBeVisible({ timeout: 15000 });
});