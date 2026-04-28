import { test, expect } from "@playwright/test";

test("TC2.09 - user can access hotel information page with existing nearby attractions", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}`);

  // user role
  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // ต้องเห็น section nearby attractions
  await expect(page.getByText("Nearby Attractions", { exact: true })).toBeVisible({ timeout: 15000 });

  // ต้องมี attraction อย่างน้อย 1 อัน
  await expect(page.getByText(/spots/i)).toBeVisible({ timeout: 15000 });

  // user ต้องไม่เห็นปุ่ม Manage Attractions
  await expect(page.getByRole("link", { name: "Manage Attractions" })).toHaveCount(0);
});