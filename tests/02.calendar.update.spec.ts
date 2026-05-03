import { test } from '@playwright/test';
import { CalendarPage } from '../pages/CalendarPage';

test.describe('Google Calendar - Update Event', () => {
  const timestamp = Date.now();
  const eventTitle = `Test Event Update ${timestamp}`;
  const updatedEventTitle = `Updated Test Event ${timestamp}`;

  test('Update an existing event', async ({ page }) => {
    const calendarPage = new CalendarPage(page);

    await test.step('Open Google calendar', async () => {
      await calendarPage.goto();
    });

    await test.step(`Creating a new event "${eventTitle}" for update`, async () => {
      await calendarPage.createEvent(eventTitle);
    });

    await test.step(`Updating the event to "${updatedEventTitle}"`, async () => {
      await calendarPage.updateEvent(eventTitle, updatedEventTitle);
    });

    await test.step('Check an updated event (Read after Update)', async () => {
      await calendarPage.verifyEventExists(updatedEventTitle);
    });

    // Cleanup to keep the calendar clean
    await test.step('Cleanup: Delete the updated event', async () => {
      await calendarPage.deleteEvent(updatedEventTitle);
    });
  });
});
