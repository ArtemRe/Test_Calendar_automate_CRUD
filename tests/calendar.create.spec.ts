import { test } from '@playwright/test';
import { CalendarPage } from '../pages/CalendarPage';

test.describe('Google Calendar - Create Event', () => {
  const timestamp = Date.now();
  const eventTitle = `Test Event Create ${timestamp}`;

  test('Create a new event', async ({ page }) => {
    const calendarPage = new CalendarPage(page);

    await test.step('Open Google calendar', async () => {
      await calendarPage.goto();
    });

    await test.step(`Creating a new event "${eventTitle}"`, async () => {
      await calendarPage.createEvent(eventTitle);
    });

    await test.step('Checking an existing event (Read)', async () => {
      await calendarPage.verifyEventExists(eventTitle);
    });

    // Cleanup to keep the calendar clean
    await test.step('Cleanup: Delete the created event', async () => {
      await calendarPage.deleteEvent(eventTitle);
    });
  });
});
