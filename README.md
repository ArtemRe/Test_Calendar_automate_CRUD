## Як запустити проект локально

1. **Клонуйте репозиторій та встановіть залежності:**
   * `npm install` — встановлення всіх бібліотек.
   * `npx playwright install` — встановлення браузерів для тестів.

2. **Авторизація:**
   * Запустіть команду: `npm run auth`
   * У вікні, що відкриється, пройдіть авторизацію вручну.
   * Зачекайте **90 секунд**, поки статус авторизації збережеться і тест закриється.
   * **Логін:** `testtestaccaunt4@gmail.com`
   * **Пароль:** `123456789A!`

3. **Запуск головного тесту:**
   * Виконайте: `npm run test:headed`

## Setup and Execution Guide

1. **Clone the repository and install dependencies:**
   * `npm install` — installs all necessary libraries.
   * `npx playwright install` — downloads and installs required browsers for testing.

2. **Authorization Process:**
   * Run the command: `npm run auth`
   * Manually log in using the credentials below in the opened browser window.
   * **Wait for 90 seconds** to ensure the authorization status is correctly saved before the window closes.
   * **Login:** `testtestaccaunt4@gmail.com`
   * **Password:** `123456789A!`

3. **Run Tests:**
   * To execute the main test in headed mode, use: `npm run test:headed`
