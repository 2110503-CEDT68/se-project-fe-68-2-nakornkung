import { test, expect } from "@playwright/test";

test("TC1.35 - delete a transportation service that has no active bookings", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // ควรใช้ชื่อ transport ที่แน่ใจว่าไม่มี active bookings
  const transportName = "PW Transport Delete Safe";

  await page.getByPlaceholder("Transport Name").fill(transportName);
  await page.waitForTimeout(1200);
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(transportName).first()).toBeVisible({ timeout: 15000 });

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Are you sure you want to delete this transportation?");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Delete" }).first().click();

  await expect(page.getByText(transportName)).not.toBeVisible({ timeout: 15000 });
});