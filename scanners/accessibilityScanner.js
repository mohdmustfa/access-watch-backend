import { chromium } from "playwright";
import axe from "axe-core";

export const runAccessibilityScan = async (url) => {

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  try {

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // inject axe-core
    await page.evaluate(axe.source);

    // run accessibility scan
    const results = await page.evaluate(async () => {
      return await axe.run();
    });

    return results;

  } finally {

    await browser.close();

  }
};