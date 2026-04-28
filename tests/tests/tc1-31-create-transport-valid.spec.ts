import { test, expect } from "@playwright/test";

test("TC1.31 - create a new transportation service with complete information", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin?callbackUrl=/admin/transport/new");

  await page.locator("#login-email").fill("araii@gmail.com");
  await page.locator("#login-password").fill("0932347933");
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/admin\/transport\/new$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  const uniqueName = `PW Transport ${Date.now()}`;

  await page.locator('input[name="name"]').fill(uniqueName);
  await page.locator('input[name="providerName"]').fill("Playwright Provider");
  await page.locator('textarea[name="description"]').fill("Transportation created by Playwright test");
  await page.locator('select[name="type"]').selectOption({ label: "Airplane" });
  await page.locator('input[name="price"]').fill("1500");
  await page.locator('input[name="img"]').fill("https://example.com/plane.jpg");

  await page.locator('input[name="pickUpName"]').fill("Don Mueang Airport");
  await page.locator('input[name="pickUpAddress"]').fill("Vibhavadi Rangsit Road");
  await page.locator('input[name="pickUpDistrict"]').fill("Don Mueang");
  await page.locator('select[name="pickUpProvince"]').selectOption({ label: "Bangkok" });
  await page.locator('input[name="pickUpPostalCode"]').fill("10210");

  await page.locator('input[name="dropOffName"]').fill("Suvarnabhumi Airport");
  await page.locator('input[name="dropOffAddress"]').fill("Bang Na-Trat Road");
  await page.locator('input[name="dropOffDistrict"]').fill("Bang Phli");
  await page.locator('select[name="dropOffProvince"]').selectOption({ label: "Samut Prakan" });
  await page.locator('input[name="dropOffPostalCode"]').fill("10540");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Transportation created successfully!");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Create Transportation" }).click();

  await expect(page).toHaveURL(/\/admin\/transport$/, { timeout: 15000 });
  await page.waitForLoadState("networkidle");

  await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15000 });
});