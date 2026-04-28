import { test, expect } from "@playwright/test";

test("TC2.03 - edit an existing attraction by updating name", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";
  const updatedName = "Test Waterfall 01-Update Name";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Manage Attractions")).toBeVisible({ timeout: 15000 });

  // เข้าโหมดแก้ไข attraction อันแรก
  await page.getByRole("button", { name: "Edit" }).first().click();

  // แก้ชื่อ
  await page.locator('input[name="name"]').fill(updatedName);

  // บันทึก
  await page.getByRole("button", { name: "Save" }).click();

  // เช็กว่าบันทึกแล้วและแสดงชื่อใหม่
  await expect(page.getByText(updatedName)).toBeVisible({ timeout: 15000 });
});