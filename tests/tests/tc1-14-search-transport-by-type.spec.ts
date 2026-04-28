import { test, expect } from "@playwright/test";

test("TC1.14 - search for transportation by type", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // เลือก type
  await page.selectOption("select", { label: "Airplane" });

  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  // เช็กว่ามีผลลัพธ์ของ type นี้
  await expect(page.getByText(/type : airp lane|type : airplane|airplane/i).first()).toBeVisible({ timeout: 15000 });
});