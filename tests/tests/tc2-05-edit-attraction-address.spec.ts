import { test, expect } from "@playwright/test";

test("TC2.05 - edit an existing attraction by updating address", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Manage Attractions")).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: "Edit" }).first().click();

  await page.locator('input[name="street"]').fill("123 example Rd-Updated");
  await page.locator('input[name="district"]').fill("District 01#Edited");
  await page.locator('input[name="province"]').fill("Province 01-edit 01");
  await page.locator('input[name="postalCode"]').fill("10201");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByText(/123 example Rd-Updated, District 01#Edited, Province 01-edit 01, 10201/i)
  ).toBeVisible({ timeout: 15000 });
});