import { test, expect } from "@playwright/test";

test("TC1.34 - edit a transportation with missing details", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("button", { name: "Edit" }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Edit" }).first().click();

  // ล้างข้อมูลสำคัญให้ไม่ครบ
  await page.locator('input[name="name"]').fill("");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Request failed with status 400");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Save" }).click();

  // ยังอยู่หน้าเดิม และยังเห็นฟอร์มแก้ไขอยู่
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible({ timeout: 15000 });
});