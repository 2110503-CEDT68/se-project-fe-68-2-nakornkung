# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tc1-01-booking-management.spec.ts >> TC1.01 - user can view bookings with transportation on booking page
- Location: tests\tests\tc1-01-booking-management.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Transportation')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Transportation')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - navigation [ref=e7]:
            - button "previous" [disabled] [ref=e8]:
              - img "previous" [ref=e9]
            - generic [ref=e11]:
              - generic [ref=e12]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e13]:
              - img "next" [ref=e14]
          - img
        - generic [ref=e16]:
          - link "Next.js 16.2.3 (stale) Turbopack" [ref=e17] [cursor=pointer]:
            - /url: https://nextjs.org/docs/messages/version-staleness
            - img [ref=e18]
            - generic "There is a newer version (16.2.4) available, upgrade recommended!" [ref=e20]: Next.js 16.2.3 (stale)
            - generic [ref=e21]: Turbopack
          - img
      - dialog "Runtime TypeError" [ref=e23]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e30]: Runtime TypeError
              - generic [ref=e31]:
                - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                  - img [ref=e33]
                - button "No related documentation found" [disabled] [ref=e35]:
                  - img [ref=e36]
                - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
            - generic [ref=e48]: Cannot read properties of null (reading 'img')
          - generic [ref=e50]:
            - paragraph [ref=e52]:
              - text: Call Stack
              - generic [ref=e53]: "17"
            - generic [ref=e54]:
              - generic [ref=e55]:
                - text: BookingCard
                - button "Sourcemapping failed. Click to log cause of error." [ref=e56] [cursor=pointer]:
                  - img [ref=e57]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/src_01_~5vu._.js (1349:40)
            - generic [ref=e59]:
              - generic [ref=e60]:
                - text: Object.react_stack_bottom_frame
                - button "Sourcemapping failed. Click to log cause of error." [ref=e61] [cursor=pointer]:
                  - img [ref=e62]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (15037:24)
            - generic [ref=e64]:
              - generic [ref=e65]:
                - text: renderWithHooks
                - button "Sourcemapping failed. Click to log cause of error." [ref=e66] [cursor=pointer]:
                  - img [ref=e67]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (4620:24)
            - generic [ref=e69]:
              - generic [ref=e70]:
                - text: updateFunctionComponent
                - button "Sourcemapping failed. Click to log cause of error." [ref=e71] [cursor=pointer]:
                  - img [ref=e72]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (6081:21)
            - generic [ref=e74]:
              - generic [ref=e75]:
                - text: beginWork
                - button "Sourcemapping failed. Click to log cause of error." [ref=e76] [cursor=pointer]:
                  - img [ref=e77]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (6691:24)
            - generic [ref=e79]:
              - generic [ref=e80]:
                - text: runWithFiberInDEV
                - button "Sourcemapping failed. Click to log cause of error." [ref=e81] [cursor=pointer]:
                  - img [ref=e82]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (965:74)
            - generic [ref=e84]:
              - generic [ref=e85]:
                - text: performUnitOfWork
                - button "Sourcemapping failed. Click to log cause of error." [ref=e86] [cursor=pointer]:
                  - img [ref=e87]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9555:97)
            - generic [ref=e89]:
              - generic [ref=e90]:
                - text: workLoopSync
                - button "Sourcemapping failed. Click to log cause of error." [ref=e91] [cursor=pointer]:
                  - img [ref=e92]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9449:40)
            - generic [ref=e94]:
              - generic [ref=e95]:
                - text: renderRootSync
                - button "Sourcemapping failed. Click to log cause of error." [ref=e96] [cursor=pointer]:
                  - img [ref=e97]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9433:13)
            - generic [ref=e99]:
              - generic [ref=e100]:
                - text: performWorkOnRoot
                - button "Sourcemapping failed. Click to log cause of error." [ref=e101] [cursor=pointer]:
                  - img [ref=e102]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9098:47)
            - generic [ref=e104]:
              - generic [ref=e105]:
                - text: performWorkOnRootViaSchedulerTask
                - button "Sourcemapping failed. Click to log cause of error." [ref=e106] [cursor=pointer]:
                  - img [ref=e107]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (10255:9)
            - generic [ref=e109]:
              - generic [ref=e110]:
                - text: MessagePort.performWorkUntilDeadline
                - button "Sourcemapping failed. Click to log cause of error." [ref=e111] [cursor=pointer]:
                  - img [ref=e112]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_next_dist_compiled_0rpq4pf._.js (2647:64)
            - generic [ref=e114]:
              - generic [ref=e115]:
                - text: <unknown>
                - button "Sourcemapping failed. Click to log cause of error." [ref=e116] [cursor=pointer]:
                  - img [ref=e117]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/src_01_~5vu._.js (2070:236)
            - generic [ref=e119]:
              - generic [ref=e120]: Array.map
              - text: <anonymous>
            - generic [ref=e121]:
              - generic [ref=e122]:
                - text: BookingListClient
                - button "Sourcemapping failed. Click to log cause of error." [ref=e123] [cursor=pointer]:
                  - img [ref=e124]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/src_01_~5vu._.js (2070:19)
            - generic [ref=e126]:
              - generic [ref=e127]:
                - text: BookingPage
                - button "Sourcemapping failed. Click to log cause of error." [ref=e128] [cursor=pointer]:
                  - img [ref=e129]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/src_01_~5vu._.js (2479:234)
            - generic [ref=e131]:
              - generic [ref=e132]:
                - text: ClientPageRoot
                - button "Sourcemapping failed. Click to log cause of error." [ref=e133] [cursor=pointer]:
                  - img [ref=e134]
              - text: file:///C:/Users/WINDOWS%2011/Documents/project%20se%20fe/se-project-fe-68-2-nakornkung/.next/dev/static/chunks/node_modules_04bplgh._.js (10392:50)
        - generic [ref=e136]: "1"
        - generic [ref=e137]: "2"
    - generic [ref=e142] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e143]:
        - img [ref=e144]
      - generic [ref=e147]:
        - button "Open issues overlay" [ref=e148]:
          - generic [ref=e149]:
            - generic [ref=e150]: "0"
            - generic [ref=e151]: "1"
          - generic [ref=e152]: Issue
        - button "Collapse issues badge" [ref=e153]:
          - img [ref=e154]
  - generic [ref=e157]:
    - img [ref=e158]
    - heading "This page couldn’t load" [level=1] [ref=e160]
    - paragraph [ref=e161]: Reload to try again, or go back.
    - generic [ref=e162]:
      - button "Reload" [ref=e164] [cursor=pointer]
      - button "Back" [ref=e165] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("TC1.01 - user can view bookings with transportation on booking page", async ({ page }) => {
  4  |   await page.goto("http://localhost:3000/auth/signin?callbackUrl=/booking");
  5  | 
  6  |   await page.locator("#login-email").fill("araii@gmail.com");
  7  |   await page.locator("#login-password").fill("0932347933");
  8  |   await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());
  9  | 
  10 |   await expect(page).toHaveURL(/\/booking$/, { timeout: 15000 });
  11 | 
  12 |   await expect(page.getByText("My Bookings")).toBeVisible();
> 13 |   await expect(page.getByText("Transportation")).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  14 |   await expect(page.getByText(/departure :/i)).toBeVisible();
  15 |   await expect(page.getByText(/passengers :/i)).toBeVisible();
  16 | });
```