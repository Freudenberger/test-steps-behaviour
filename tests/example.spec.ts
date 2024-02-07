import { expect, test } from "@playwright/test";

test.describe("Whole test suit", () => {
  test("test that should fail", async ({ page }) => {
    await test.step("step 1 (should pass)", async () => {
      expect.soft("test 1").toEqual("test 1");
    });

    let value = await test.step("step 2 (should FAIL)", async () => {
      await page.goto("");

      // following expect should result in following Error:
      //   Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

      // Locator: locator('#header_2')
      // Expected string: "test 4"
      // Received string: ""
      await expect(page.locator("#header_2")).toHaveText("test 4");

      return "1234";
    });

    await test.step("step 3 (should be ignored)", async () => {
      expect.soft(value).toEqual("1234");
    });
  });

  test("test that should pass", async ({}) => {
    await test.step("step 1", async () => {
      expect.soft("test 5").toEqual("test 5");
    });

    await test.step("step 2", async () => {
      await test.step("step 2.1", async () => {
        expect.soft("test 7").toEqual("test 7");
      });

      await test.step("step 2.2", async () => {
        expect("test 6").toEqual("test 6");
      });
    });
  });
});
