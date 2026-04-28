import { test, expect } from "@playwright/test";

test("TC2.01 - add an attraction with all valid and required details", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions/new`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions/new$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const uniqueName = `Test Waterfall ${Date.now()}`;

  await page.locator('input[name="name"]').fill(uniqueName);
  await page.locator('select[name="category"]').selectOption("nature");
  await page.locator('textarea[name="description"]').fill("A beautiful nearby attraction created by Playwright.");
  await page.locator('input[name="img"]').fill("https://drive.google.com/uc?id=1Q6GHuR9qlc1MQX1eqhqJ8jfNff6rFGkO");

  await page.locator('input[name="street"]').fill("123 example Rd.");
  await page.locator('input[name="district"]').fill("District 01");
  await page.locator('input[name="province"]').fill("Province 01");
  await page.locator('input[name="postalCode"]').fill("10200");

  await page.locator('input[name="latitude"]').fill("13.7563");
  await page.locator('input[name="longitude"]').fill("100.5018");

  await page.locator('#toggle-monday').check();
  await page.locator('input[type="time"]').nth(0).fill("08:30");
  await page.locator('input[type="time"]').nth(1).fill("15:30");

  await page.getByRole("button", { name: "Create Attraction" }).click();

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15000 });
});