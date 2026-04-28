import { test, expect } from "@playwright/test";

test("TC2.08 - admin can access hotel information page with existing nearby attractions", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}`);

  // admin role
  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // ต้องเห็น section nearby attractions
  await expect(page.getByText("Nearby Attractions", { exact: true })).toBeVisible({ timeout: 15000 });

  // ต้องมี attraction อย่างน้อย 1 อัน
  await expect(page.getByText(/spots/i)).toBeVisible({ timeout: 15000 });

  // admin ต้องเห็นปุ่ม Manage Attractions
  await expect(page.getByRole("link", { name: "Manage Attractions" })).toBeVisible({ timeout: 15000 });
});