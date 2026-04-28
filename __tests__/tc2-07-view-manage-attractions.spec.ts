import { test, expect } from "@playwright/test";

test("TC2.07 - access the Manage Attractions page with existing attractions", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), {
    timeout: 15000,
  });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Manage Attractions")).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("link", { name: "Create Attraction" })).toBeVisible({
    timeout: 15000,
  });

  // ต้องมี attraction อย่างน้อย 1 รายการ
  await expect(page.getByRole("button", { name: "Edit" }).first()).toBeVisible({
    timeout: 15000,
  });
  await expect(page.getByRole("button", { name: "Delete" }).first()).toBeVisible({
    timeout: 15000,
  });
});