import { Page, Locator, expect } from '@playwright/test';

export class CalendarPage {
  readonly page: Page;


  readonly createButton: Locator;


  readonly titleInput: Locator;
  readonly saveButton: Locator;


  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;


    this.createButton = page.locator('div[role="button"], button').filter({ hasText: /Створити|Create/i }).first();


    this.titleInput = page.locator('input[placeholder*="title" i], input[placeholder*="назв" i], input[aria-label*="title" i], input[aria-label*="назв" i], input[aria-label="Назва"]').first();


    this.saveButton = page.getByRole('button', { name: /Save|Зберегти/i }).last();


    this.editButton = page.locator('[aria-label="Edit event" i]:visible, [aria-label="Змінити подію" i]:visible, [aria-label="Редагувати подію" i]:visible').first();
    this.deleteButton = page.locator('[aria-label="Delete event" i]:visible, [aria-label="Видалити подію" i]:visible').first();
  }

  async goto() {
    await this.page.goto('/');
    // wait for main grid
    await this.page.waitForSelector('div[role="main"]');

  }

  // C - Create
  async createEvent(title: string) {
    await this.createButton.click();

    // If the "Event" dropdown menu appears, click on it

    const eventMenuItem = this.page.locator('div[role="menuitem"]:visible, li[role="menuitem"]:visible').filter({ hasText: /Подія|Event/i }).first();
    try {
      await eventMenuItem.click({ timeout: 2000 });
    } catch (e) {

    }

    await this.titleInput.waitFor({ state: 'visible' });
    await this.titleInput.fill(title);
    await this.saveButton.click();
    await this.titleInput.waitFor({ state: 'hidden' });
    await this.page.waitForTimeout(1000);
  }

  // R - Read
  async verifyEventExists(title: string) {
    const eventLocator = this.page.locator('div[role="button"]').filter({ hasText: title }).first();
    await expect(eventLocator).toBeVisible({ timeout: 5000 });
    return eventLocator;
  }

  // U - Update
  async updateEvent(oldTitle: string, newTitle: string) {
    const eventLocator = await this.verifyEventExists(oldTitle);
    await eventLocator.click();
    await this.editButton.waitFor({ state: 'visible' });
    await this.editButton.click();

    await this.titleInput.waitFor({ state: 'visible' });
    await this.titleInput.clear();
    await this.titleInput.fill(newTitle);


    await this.saveButton.click();
    await this.titleInput.waitFor({ state: 'hidden' });
    await this.page.waitForTimeout(1000);
  }

  // D - Delete
  async deleteEvent(title: string) {
    const eventLocator = await this.verifyEventExists(title);
    await eventLocator.click();
    await this.deleteButton.waitFor({ state: 'visible' });
    await this.deleteButton.click();
    await expect(this.page.locator('div[role="button"]').filter({ hasText: title }).first()).toBeHidden({ timeout: 5000 });
  }
}
