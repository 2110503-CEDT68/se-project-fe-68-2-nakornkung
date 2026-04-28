import { test, expect } from "@playwright/test";

test("TC1.06 - edit an existing booking by updating departure date", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // เพิ่ม transport
  await page.getByText("Add new booking").click();
  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Book" }).first().click();
  await page.locator('input[type="datetime-local"]').fill("2026-04-16T13:38");
  await page.locator('input[type="number"]').fill("2");
  await page.getByRole("button", { name: "Confirm Add" }).click();

  // transportation booking
  await page.getByRole("button", { name: "Edit" }).first().click();
  
  const newDeparture = "2026-04-17T15:45";
  await page.locator('input[type="datetime-local"]').fill(newDeparture);
  
  // transportation booking
  await page.getByRole("button", { name: "Save" }).first().click();

  await expect(page.getByText(/Departure :/i).first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/4\/17\/2026/i).first()).toBeVisible({ timeout: 15000 });
});