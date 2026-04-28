import { test, expect } from "@playwright/test";

test("TC1.07 - edit an existing booking by updating number of passengers", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  // กด Edit ของ transport booking
  await page.getByRole("button", { name: "Edit" }).nth(1).click();

  // เปลี่ยนจำนวนผู้โดยสาร
  await page.locator('input[type="number"]').fill("2");

  // กด Save
  await page.getByRole("button", { name: "Save" }).click();

  // เช็กว่าบันทึกแล้ว
  await expect(page.getByText(/Passengers :/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/Passengers : 2/i)).toBeVisible({ timeout: 15000 });
});