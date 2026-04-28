# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tc2-01-create-attraction-valid.spec.ts >> TC2.01 - add an attraction with all valid and required details
- Location: tests\tests\tc2-01-create-attraction-valid.spec.ts:3:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/hotels\/69f0591361cfe469eefd76cb\/attractions$/
Received string:  "http://localhost:3000/hotels/69f0591361cfe469eefd76cb/attractions/new"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    18 × unexpected value "http://localhost:3000/hotels/69f0591361cfe469eefd76cb/attractions/new"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "Logo" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Logo" [ref=e6]
      - generic [ref=e8] [cursor=pointer]: "Logged in as: Mrs. Cecilia Stracke"
      - link "Admin" [ref=e11] [cursor=pointer]:
        - /url: /admin
      - link "Hotels" [ref=e13] [cursor=pointer]:
        - /url: /hotels
      - link "Booking" [ref=e15] [cursor=pointer]:
        - /url: /booking
      - generic [ref=e16] [cursor=pointer]: Logout
  - main [ref=e17]:
    - generic [ref=e18]: Create Attraction
    - generic [ref=e19]:
      - paragraph [ref=e20]: buildHotelPayload is not defined
      - generic [ref=e21]:
        - heading "Basic Info" [level=2] [ref=e22]
        - generic [ref=e23]:
          - generic [ref=e24]:
            - generic [ref=e25]: Name *
            - textbox "e.g. Wat Pho" [ref=e26]: Test Waterfall 1777366616079
          - generic [ref=e27]:
            - generic [ref=e28]: Category *
            - combobox [ref=e29]:
              - option "Museum"
              - option "Restaurant"
              - option "Landmark"
              - option "Nature" [selected]
              - option "Activity"
              - option "Temple"
              - option "Park"
              - option "Other"
          - generic [ref=e30]:
            - generic [ref=e31]: Description
            - textbox "Short description of the attraction" [ref=e32]: A beautiful nearby attraction created by Playwright.
          - generic [ref=e33]:
            - generic [ref=e34]: Image URL *
            - textbox "https://..." [ref=e35]: https://drive.google.com/uc?id=1Q6GHuR9qlc1MQX1eqhqJ8jfNff6rFGkO
      - generic [ref=e36]:
        - heading "Address" [level=2] [ref=e37]
        - generic [ref=e38]:
          - generic [ref=e39]:
            - generic [ref=e40]: Street
            - textbox "123 Example Rd" [ref=e41]: 123 example Rd.
          - generic [ref=e42]:
            - generic [ref=e43]: District *
            - textbox "District" [ref=e44]: District 01
          - generic [ref=e45]:
            - generic [ref=e46]: Province *
            - textbox "Province" [ref=e47]: Province 01
          - generic [ref=e48]:
            - generic [ref=e49]: Postal Code
            - textbox "10200" [ref=e50]
          - generic [ref=e51]:
            - generic [ref=e52]: Latitude *
            - textbox "13.7563" [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]: Longitude *
            - textbox "100.5018" [ref=e56]
      - generic [ref=e57]:
        - heading "Opening Hours (optional)" [level=2] [ref=e58]
        - generic [ref=e59]:
          - generic [ref=e60]:
            - checkbox "monday" [checked] [ref=e61]
            - generic [ref=e62]: monday
            - textbox [ref=e63]: 08:30
            - generic [ref=e64]: –
            - textbox [ref=e65]: 15:30
          - generic [ref=e66]:
            - checkbox "tuesday" [ref=e67]
            - generic [ref=e68]: tuesday
            - textbox [disabled] [ref=e69]: 09:00
            - generic [ref=e70]: –
            - textbox [disabled] [ref=e71]: 18:00
          - generic [ref=e72]:
            - checkbox "wednesday" [ref=e73]
            - generic [ref=e74]: wednesday
            - textbox [disabled] [ref=e75]: 09:00
            - generic [ref=e76]: –
            - textbox [disabled] [ref=e77]: 18:00
          - generic [ref=e78]:
            - checkbox "thursday" [ref=e79]
            - generic [ref=e80]: thursday
            - textbox [disabled] [ref=e81]: 09:00
            - generic [ref=e82]: –
            - textbox [disabled] [ref=e83]: 18:00
          - generic [ref=e84]:
            - checkbox "friday" [ref=e85]
            - generic [ref=e86]: friday
            - textbox [disabled] [ref=e87]: 09:00
            - generic [ref=e88]: –
            - textbox [disabled] [ref=e89]: 18:00
          - generic [ref=e90]:
            - checkbox "saturday" [ref=e91]
            - generic [ref=e92]: saturday
            - textbox [disabled] [ref=e93]: 09:00
            - generic [ref=e94]: –
            - textbox [disabled] [ref=e95]: 18:00
          - generic [ref=e96]:
            - checkbox "sunday" [ref=e97]
            - generic [ref=e98]: sunday
            - textbox [disabled] [ref=e99]: 09:00
            - generic [ref=e100]: –
            - textbox [disabled] [ref=e101]: 18:00
      - generic [ref=e102]:
        - button "Cancel" [ref=e103]
        - button "Create Attraction" [ref=e104]
  - button "Open Next.js Dev Tools" [ref=e110] [cursor=pointer]:
    - img [ref=e111]
  - alert [ref=e114]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("TC2.01 - add an attraction with all valid and required details", async ({ page }) => {
  4  |   const hotelId = "69f0591361cfe469eefd76cb";
  5  | 
  6  |   await page.goto(`http://localhost:3000/auth/signin?callbackUrl=/hotels/${hotelId}/attractions/new`);
  7  | 
  8  |   await page.locator("#login-email").fill("admin@gmail.com");
  9  |   await page.locator("#login-password").fill("password");
  10 |   await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());
  11 | 
  12 |   await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions/new$`), { timeout: 15000 });
  13 |   await page.waitForLoadState("networkidle");
  14 | 
  15 |   const uniqueName = `Test Waterfall ${Date.now()}`;
  16 | 
  17 |   await page.locator('input[name="name"]').fill(uniqueName);
  18 |   await page.locator('select[name="category"]').selectOption("nature");
  19 |   await page.locator('textarea[name="description"]').fill("A beautiful nearby attraction created by Playwright.");
  20 |   await page.locator('input[name="img"]').fill("https://drive.google.com/uc?id=1Q6GHuR9qlc1MQX1eqhqJ8jfNff6rFGkO");
  21 | 
  22 |   await page.locator('input[name="street"]').fill("123 example Rd.");
  23 |   await page.locator('input[name="district"]').fill("District 01");
  24 |   await page.locator('input[name="province"]').fill("Province 01");
  25 |   await page.locator('input[name="postalCode"]').fill("10200");
  26 | 
  27 |   await page.locator('input[name="latitude"]').fill("13.7563");
  28 |   await page.locator('input[name="longitude"]').fill("100.5018");
  29 | 
  30 |   await page.locator('#toggle-monday').check();
  31 |   await page.locator('input[type="time"]').nth(0).fill("08:30");
  32 |   await page.locator('input[type="time"]').nth(1).fill("15:30");
  33 | 
  34 |   await page.getByRole("button", { name: "Create Attraction" }).click();
  35 | 
> 36 |   await expect(page).toHaveURL(new RegExp(`/hotels/${hotelId}/attractions$`), { timeout: 15000 });
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  37 |   await page.waitForLoadState("networkidle");
  38 | 
  39 |   await expect(page.getByText(uniqueName)).toBeVisible({ timeout: 15000 });
  40 | });
```