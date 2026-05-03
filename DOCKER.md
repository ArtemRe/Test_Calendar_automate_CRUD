# Dockerization Plan for Playwright Google Calendar Tests

This plan outlines the steps to containerize your Playwright project. Dockerizing the project ensures that tests run in a consistent environment, regardless of the host OS.

## 1. Files Created
- `Dockerfile`: Instructions for building the container image.
- `.dockerignore`: Files to exclude from the image to keep it lightweight.

## 2. Building and Running
Since your tests depend on `.auth/user.json`, you should first generate it locally (if you haven't already) and then mount the `.auth` directory to the container.

---

### Step 1: Build the Docker image
Run this command in your project root:
```powershell
docker build -t playwright-calendar .
```

### Step 2: Run the tests
Run this command to execute the tests inside the container. We mount the `.auth` directory so the container can access your login session:
```powershell
docker run -v ${PWD}/.auth:/app/.auth playwright-calendar
```

> [!NOTE]
> `${PWD}` is for PowerShell. If you use CMD, use `%cd%`. If you use Bash, use `$(pwd)`.

### Step 3: View Reports
To see the results and reports after the run, you can mount the `playwright-report` folder:
```powershell
docker run -v ${PWD}/.auth:/app/.auth -v ${PWD}/playwright-report:/app/playwright-report playwright-calendar
```

## 3. Why Docker?
- **Consistency**: The tests will run the same way on any machine.
- **Headless by Default**: Playwright images are optimized for headless execution in CI/CD pipelines.
- **Dependency Management**: No need to install browsers or specific Node versions on the host machine.
