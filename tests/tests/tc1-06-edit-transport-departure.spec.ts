import { test, expect } from "@playwright/test";

test("TC1.06 - edit an existing booking by updating departure date", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // ต้องมี transport booking อยู่ก่อน
  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  // กด Edit ของ transport booking
  await page.getByRole("button", { name: "Edit" }).nth(1).click();

  // เปลี่ยน departure date
  const newDeparture = "2026-04-16T15:45";
  await page.locator('input[type="datetime-local"]').fill(newDeparture);

  // กด Save
  await page.getByRole("button", { name: "Save" }).click();

  // รอให้กลับมาเป็นโหมดแสดงผล แล้วเช็กว่า departure ยังอยู่
  await expect(page.getByText(/Departure :/i)).toBeVisible({ timeout: 15000 });

  // เช็กค่าใหม่แบบกว้าง ๆ กัน locale format ต่างกัน
  await expect(page.getByText(/4\/16\/2026/i)).toBeVisible({ timeout: 15000 });
});