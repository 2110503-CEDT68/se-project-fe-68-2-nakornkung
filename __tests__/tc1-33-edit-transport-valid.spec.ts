import { test, expect } from "@playwright/test";

test("TC1.33 - edit a transportation with valid updates", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const transportName = "PW Transport";

  await page.getByPlaceholder("Transport Name").fill(transportName);
  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  // ต้องมี transport อย่างน้อย 1 อัน
  await expect(page.getByRole("button", { name: "Edit" }).first()).toBeVisible({ timeout: 15000 });

  // เข้าโหมดแก้ไข transport อันแรก
  await page.getByRole("button", { name: "Edit" }).first().click();

  const updatedName = `Edited PW Transport ${Date.now()}`;

  // แก้ข้อมูลแบบ valid
  await page.locator('input[name="name"]').fill(updatedName);
  await page.locator('input[name="providerName"]').fill("Updated Provider");
  await page.locator('textarea[name="description"]').fill("Updated by Playwright");
  await page.locator('input[name="price"]').fill("2500");

  // กด Save
  await page.getByRole("button", { name: "Save" }).click();

  // เช็กว่าบันทึกแล้ว และกลับมาแสดงผลโหมดปกติ
  await expect(page.getByText(updatedName)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/Updated Provider/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/2500฿/i).first()).toBeVisible({ timeout: 15000 });
});