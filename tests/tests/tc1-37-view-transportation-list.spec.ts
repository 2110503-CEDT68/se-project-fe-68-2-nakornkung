import { test, expect } from "@playwright/test";

test("TC1.37 - view the transportation list", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // หน้า list ต้องมีปุ่ม create และมีรายการ transport อย่างน้อย 1 อัน
  await expect(page.getByText("Create transportation")).toBeVisible({ timeout: 15000 });

  // เช็กว่ามีปุ่ม Edit ของ transport card อย่างน้อย 1 อัน
  await expect(page.getByRole("button", { name: "Edit" }).first()).toBeVisible({ timeout: 15000 });

  // เช็กว่ามีปุ่ม Delete ของ transport card อย่างน้อย 1 อัน
  await expect(page.getByRole("button", { name: "Delete" }).first()).toBeVisible({ timeout: 15000 });
});