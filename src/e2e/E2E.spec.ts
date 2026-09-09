import { test, expect } from "@playwright/test";

test.describe("Total electricity consumption", () => {
  const API_URL = "http://localhost:3000/api/dashboard";

  test.beforeEach(async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: 200,
            hourlyprice: 10,
          },
          {
            id: 2,
            date: "2023-09-04",
            starttime: "01:00",
            productionamount: 120,
            consumptionamount: 180,
            hourlyprice: 20,
          },
          {
            id: 3,
            date: "2023-09-04",
            starttime: "02:00",
            productionamount: 110,
            consumptionamount: null,
            hourlyprice: 30,
          },
          {
            id: 4,
            date: "2023-09-05",
            starttime: "00:00",
            productionamount: 150,
            consumptionamount: 300,
            hourlyprice: 15,
          },
          {
            id: 5,
            date: "2023-09-05",
            starttime: "01:00",
            productionamount: 200,
            consumptionamount: 100,
            hourlyprice: 25,
          },
        ]),
      });
    });

    await page.goto("http://localhost:5173/");
  });

  test("dashboard is visible", async ({ page }) => {
    await expect(page.getByRole("grid")).toBeVisible();
  });

  test("first date is displayed", async ({ page }) => {
    await expect(
      page.locator('[data-field="date"]').filter({
        hasText: "2023-09-04",
      })
    ).toBeVisible();
  });

  test("second date is displayed", async ({ page }) => {
    await expect(
      page.locator('[data-field="date"]').filter({
        hasText: "2023-09-05",
      })
    ).toBeVisible();
  });

  test("total consumption column is displayed", async ({ page }) => {
    await expect(
      page.getByRole("columnheader", {
        name: /total consumption/i,
      })
    ).toBeVisible();
  });

  test("calculates total consumption correctly", async ({ page }) => {
    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "380",
      })
    ).toBeVisible();
  });

  test("calculates total consumption for another day", async ({ page }) => {
    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "400",
      })
    ).toBeVisible();
  });

  test("null consumption is treated as zero", async ({ page }) => {
    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "380",
      })
    ).toBeVisible();
  });

  test("multiple dates are calculated independently", async ({ page }) => {
    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "380",
      })
    ).toBeVisible();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "400",
      })
    ).toBeVisible();
  });

  test("does not display NaN", async ({ page }) => {
    await expect(page.getByRole("grid")).not.toContainText("NaN");
  });

  test("does not display undefined", async ({ page }) => {
    await expect(page.getByRole("grid")).not.toContainText("undefined");
  });

  test("does not display null", async ({ page }) => {
    await expect(page.getByRole("grid")).not.toContainText("null");
  });

  test("handles zero consumption", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: 0,
            hourlyprice: 10,
          },
          {
            id: 2,
            date: "2023-09-04",
            starttime: "01:00",
            productionamount: 100,
            consumptionamount: 0,
            hourlyprice: 20,
          },
        ]),
      });
    });

    await page.reload();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "0",
      })
    ).toBeVisible();
  });

  test("handles only null consumption values", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: null,
            hourlyprice: 10,
          },
          {
            id: 2,
            date: "2023-09-04",
            starttime: "01:00",
            productionamount: 100,
            consumptionamount: null,
            hourlyprice: 20,
          },
        ]),
      });
    });

    await page.reload();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "0",
      })
    ).toBeVisible();
  });

  test("handles large consumption values", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: 1000000,
            hourlyprice: 10,
          },
          {
            id: 2,
            date: "2023-09-04",
            starttime: "01:00",
            productionamount: 100,
            consumptionamount: 2000000,
            hourlyprice: 20,
          },
        ]),
      });
    });

    await page.reload();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "3000000",
      })
    ).toBeVisible();
  });

  test("handles negative consumption values", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: -100,
            hourlyprice: 10,
          },
          {
            id: 2,
            date: "2023-09-04",
            starttime: "01:00",
            productionamount: 100,
            consumptionamount: 200,
            hourlyprice: 20,
          },
        ]),
      });
    });

    await page.reload();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "100",
      })
    ).toBeVisible();
  });

  test("handles a single consumption value", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            date: "2023-09-04",
            starttime: "00:00",
            productionamount: 100,
            consumptionamount: 500,
            hourlyprice: 10,
          },
        ]),
      });
    });

    await page.reload();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "500",
      })
    ).toBeVisible();
  });

  test("API endpoint is requested", async ({ page }) => {
    const requestPromise = page.waitForRequest(API_URL);

    await page.reload();

    const request = await requestPromise;

    expect(request.url()).toBe(API_URL);
    expect(request.method()).toBe("GET");
  });

  test("dashboard still works after page reload", async ({ page }) => {
    await page.reload();

    await expect(page.getByRole("grid")).toBeVisible();

    await expect(
      page.locator('[data-field="date"]').filter({
        hasText: "2023-09-04",
      })
    ).toBeVisible();

    await expect(
      page.locator('[data-field="totalConsumption"]').filter({
        hasText: "380",
      })
    ).toBeVisible();
  });

  test("clicking a row updates the selected day", async ({ page }) => {
    const row = page.getByRole("row").filter({
      hasText: "2023-09-04",
    });

    await row.click();

    await expect(row).toBeVisible();
  });

  test("second row can be selected", async ({ page }) => {
    const row = page.getByRole("row").filter({
      hasText: "2023-09-05",
    });

    await row.click();

    await expect(row).toBeVisible();
  });

  test("correct number of data rows is displayed", async ({ page }) => {
    const rows = page.getByRole("row");

    await expect(rows).toHaveCount(3);
  });

  test("consumption value belongs to the correct date", async ({ page }) => {
    const firstRow = page.getByRole("row").filter({
      hasText: "2023-09-04",
    });

    const secondRow = page.getByRole("row").filter({
      hasText: "2023-09-05",
    });

    await expect(firstRow).toContainText("380");
    await expect(secondRow).toContainText("400");
  });

  test("selecting first row does not remove the second row", async ({
    page,
  }) => {
    await page
      .getByRole("row")
      .filter({ hasText: "2023-09-04" })
      .click();

    await expect(
      page.getByRole("row").filter({
        hasText: "2023-09-05",
      })
    ).toBeVisible();
  });

  test("selecting second row does not remove the first row", async ({
    page,
  }) => {
    await page
      .getByRole("row")
      .filter({ hasText: "2023-09-05" })
      .click();

    await expect(
      page.getByRole("row").filter({
        hasText: "2023-09-04",
      })
    ).toBeVisible();
  });
});
