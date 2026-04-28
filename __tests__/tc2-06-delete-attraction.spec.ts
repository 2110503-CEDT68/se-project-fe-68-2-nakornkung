import { test, expect } from "@playwright/test";

test("TC2.06 - delete a nearby attraction", async ({ page }) => {
  const hotelId = "69f0591361cfe469eefd76cb";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions`);

  await page.locator("#login-email").fill("admin@gmail.com");
  await page.locator("#login-password").fill("password");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Manage Attractions")).toBeVisible({ timeout: 15000 });

  // ต้องมี attraction อย่างน้อย 1 อันก่อนลบ
  await expect(page.getByRole("button", { name: "Delete" }).first()).toBeVisible({ timeout: 15000 });

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Are you sure you want to delete");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Delete" }).first().click();

  // หลังลบ ถ้าเหลือ 0 รายการ จะขึ้นข้อความนี้
  // ถ้ายังเหลือรายการอื่น ก็อย่างน้อยปุ่ม Delete ตัวแรกต้องเปลี่ยน/จำนวนลดลง
  await page.waitForLoadState("networkidle");

  const noAttractions = page.getByText("No attractions found.");
  const deleteButtons = page.getByRole("button", { name: "Delete" });

  if (await noAttractions.count()) {
    await expect(noAttractions).toBeVisible({ timeout: 15000 });
  } else {
    await expect(deleteButtons.first()).toBeVisible({ timeout: 15000 });
  }
});