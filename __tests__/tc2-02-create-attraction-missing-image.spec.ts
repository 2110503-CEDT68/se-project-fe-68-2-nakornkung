import { test, expect } from "@playwright/test";

test("TC2.02 - add an attraction with a missing Image URL", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions/new`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(
    page,
  ).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions/new$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const uniqueName = `Test Waterfall ${Date.now()}`;

  await page.locator('input[name="name"]').fill(uniqueName);
  await page.locator('select[name="category"]').selectOption("nature");
  await page
    .locator('textarea[name="description"]')
    .fill("A nearby attraction created by Playwright with missing image URL.");

  // ตั้งใจปล่อย img ว่าง
  await page.locator('input[name="img"]').fill("");

  await page.locator('input[name="street"]').fill("123 example Rd.");
  await page.locator('input[name="district"]').fill("District 01");
  await page.locator('input[name="province"]').fill("Province 01");
  await page.locator('input[name="postalCode"]').fill("10200");

  await page.locator('input[name="latitude"]').fill("13.7563");
  await page.locator('input[name="longitude"]').fill("100.5018");

  await page.locator("#toggle-monday").check();
  await page.locator('input[type="time"]').nth(0).fill("08:30");
  await page.locator('input[type="time"]').nth(1).fill("15:30");

  await page.getByRole("button", { name: "Create Attraction" }).click();

  // ต้องยังอยู่หน้าเดิม
  await expect(
    page,
  ).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions/new$`), { timeout: 15000 });

  // ต้องเห็น error จาก backend
  await expect(
    page.getByText(/Attraction validation failed: img: Path `img` is required/i),
  ).toBeVisible({ timeout: 15000 });
});