import { test, expect } from "@playwright/test";

test("TC1.15 - search for transportation by province", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await page.getByText("Add new booking").click();

  // เลือก province
  await page.getByRole("combobox").nth(1).selectOption({ label: "Bangkok" });

  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  // เช็กว่ามีผลลัพธ์ของ province นี้
  await expect(page.getByTitle('Bangkok').first()).toBeVisible({ timeout: 15000 });
});