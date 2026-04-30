import { test } from '@playwright/test';
import { CalendarPage } from '../pages/CalendarPage';

test.describe('Google Calendar CRUD Operations', () => {

  const timestamp = Date.now();
  const eventTitle = `Test Event ${timestamp}`;
  const updatedEventTitle = `Updated Test Event ${timestamp}`;

  test('Opening a calendar, creating, editing, deleting an event', async ({ page }) => {
    const calendarPage = new CalendarPage(page);

    await test.step('Open Google calendare', async () => {
      await calendarPage.goto();
    });

    await test.step(`Creating a new event "${eventTitle}"`, async () => {
      await calendarPage.createEvent(eventTitle);
    });

    await test.step('Checking an existing event (Read)', async () => {
      await calendarPage.verifyEventExists(eventTitle);
    });

    await test.step(`updating an event "${updatedEventTitle}"`, async () => {
      await calendarPage.updateEvent(eventTitle, updatedEventTitle);
    });

    await test.step('Check an updated event (Read after Update)', async () => {
      await calendarPage.verifyEventExists(updatedEventTitle);
    });

    await test.step('Delete an event', async () => {
      await calendarPage.deleteEvent(updatedEventTitle);
    });
  });
});
