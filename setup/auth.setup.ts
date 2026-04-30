import { test as setup } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import * as path from 'path';
import * as readline from 'readline';

chromium.use(stealth());

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async () => {
  setup.setTimeout(300000); // 5 хвилин на логін
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://calendar.google.com');

  console.log('\n======================================================');
  console.log(' БУДЬ ЛАСКА, ЗАЛОГІНЬТЕСЬ У ВІКНІ БРАУЗЕРА');
  console.log(' У вас є 90 СЕКУНД. Скрипт просто почекає цей час.');
  console.log('======================================================\n');

  // Найпростіший варіант: просто чекаємо 90 секунд.
  await page.waitForTimeout(90000);
  
  // Зберігаємо стан авторизації
  await context.storageState({ path: authFile });
  console.log('--- СТАН АВТОРИЗАЦІЇ ЗБЕРЕЖЕНО ---');

  await browser.close();
});
