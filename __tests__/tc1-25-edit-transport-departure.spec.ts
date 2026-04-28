import { test, expect } from "@playwright/test";

test("TC1.25 - edit an existing booking by updating departure date", async ({ page }) => {
  const hotelId = "69c16f5e699eaa901a4af472";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Transportation")).toBeVisible({ timeout: 15000 });

  // เพิ่ม transport
  await page.getByText("Add new booking").click();
  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Book" }).first().click();
  await page.locator('input[type="datetime-local"]').fill("2026-04-16T13:38");
  await page.locator('input[type="number"]').fill("2");
  await page.getByRole("button", { name: "Confirm Add" }).click();

  // กด Edit ของ transport booking
  await page.getByRole("button", { name: "Edit" }).first().click();

  // เปลี่ยน departure date
  const newDeparture = "2026-04-16T15:45";
  await page.locator('input[type="datetime-local"]').fill(newDeparture);

  // กด Save
  await page.getByRole("button", { name: "Save" }).click();

  // เช็กว่าบันทึกแล้ว
  await expect(page.getByText(/Departure :/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/4\/16\/2026/i)).toBeVisible({ timeout: 15000 });
});