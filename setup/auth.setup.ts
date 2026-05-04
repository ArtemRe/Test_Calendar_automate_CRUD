import { test as setup } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import * as path from 'path';
import * as readline from 'readline';

chromium.use(stealth());

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async () => {
  setup.setTimeout(300000);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://calendar.google.com');
  console.log(' You have 90 SECONDS. The script will simply wait for this time.');



  await page.waitForTimeout(90000);


  await context.storageState({ path: authFile });
  console.log('AUTHORIZATION STATUS SAVED');

  await browser.close();
});
