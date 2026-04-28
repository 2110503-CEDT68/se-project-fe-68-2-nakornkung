import { test, expect } from "@playwright/test";

test("TC1.02 - add a transportation with valid departure date and passenger count", async ({ page }) => {
  // ต้องเปลี่ยน hotel id ให้เป็นของจริงที่มีอยู่ในระบบ
  const hotelId = "69c16f5e699eaa901a4af472";

  await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/book?hotel=${hotelId}`);

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/book\?hotel=/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  // เปิด panel เพิ่ม transport
  await page.getByText("Add new booking").click();

  // รอ transport card ขึ้น แล้วกด Book อันแรก
  await expect(page.getByRole("button", { name: "Book" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Book" }).first().click();

  // กรอกข้อมูลที่จำเป็น
  await page.locator('input[type="datetime-local"]').fill("2026-04-16T13:38");
  await page.locator('input[type="number"]').fill("2");

  // ยืนยันเพิ่ม
  await page.getByRole("button", { name: "Confirm Add" }).click();

  // ต้องเห็นรายการ transport booking ถูกเพิ่มใน panel
  await expect(page.getByText(/Passengers :/i).first()).toBeVisible();
  await expect(page.getByText(/Departure :/i).first()).toBeVisible();

  // เช็กว่ามีจำนวนผู้โดยสารที่เราใส่
  await expect(page.getByText(/Passengers : 2/i)).toBeVisible();
});