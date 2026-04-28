import { test, expect } from "@playwright/test";

test("TC1.32 - attempt to create a transportation service with missing information", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport/new");

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport\/new$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const uniqueName = `PW Invalid Transport ${Date.now()}`;

  // กรอกบางส่วน แต่ปล่อย field required หลัก ๆ ว่าง
  await page.locator('input[name="name"]').fill(uniqueName);
  await page.locator('input[name="providerName"]').fill("Playwright Provider");

  // ไม่กรอก type
  // ไม่กรอก price
  // ไม่กรอก img
  // ไม่กรอก location fields

  await page.getByRole("button", { name: "Create Transportation" }).click();

  // ถ้า browser validation ทำงาน จะยังอยู่หน้าเดิมและไม่ redirect
  await expect(page).toHaveURL(/\/admin\/transport\/new$/, { timeout: 5000 });

  // ตรวจว่าอย่างน้อย field required ตัวแรกยัง invalid
  await expect(page.locator('select[name="type"]')).toBeVisible();
  const isTypeInvalid = await page.locator('select[name="type"]').evaluate((el: HTMLSelectElement) => !el.checkValidity());
  expect(isTypeInvalid).toBeTruthy();
});