import { test } from '@playwright/test';
import { CalendarPage } from '../pages/CalendarPage';

test.describe('Google Calendar - Delete Event', () => {
  const timestamp = Date.now();
  const eventTitle = `Test Event Delete ${timestamp}`;

  test('Delete an event', async ({ page }) => {
    const calendarPage = new CalendarPage(page);

    await test.step('Open Google calendar', async () => {
      await calendarPage.goto();
    });

    await test.step(`Creating a new event "${eventTitle}" to delete`, async () => {
      await calendarPage.createEvent(eventTitle);
    });

    await test.step('Delete the event', async () => {
      await calendarPage.deleteEvent(eventTitle);
    });
  });
});
