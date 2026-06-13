# Personal Workout Tracker

A personal workout tracking website built with React, TypeScript, Vite, and LocalStorage. The app includes Dashboard, Profile, Workout History, and Statistics pages with a default dark mode and responsive layouts for mobile and desktop.

## Run The Project

0. Install Node.js LTS if your machine does not have `node` and `npm`.

   If you use the prebuilt Node.js ZIP, add the extracted folder to your current PowerShell session:

   ```powershell
   $env:Path = "D:\node-v24.16.0-win-x64;$env:Path"
   ```

1. Install dependencies in the project folder:

   ```bash
   npm.cmd install
   ```

2. Start the dev server:

   ```bash
   npm.cmd run dev
   ```

3. Open the Vite URL shown in the terminal, usually:

   ```text
   http://localhost:5173
   ```

## Production Build

```bash
npm.cmd run build
```

## Folder Structure

```text
src/
  components/   Shared UI components
  data/         Fixed workout schedule
  hooks/        LocalStorage hooks
  pages/        Dashboard, Profile, Workout, History, Statistics
  types/        TypeScript data types
  utils/        BMI, dates, and statistics helpers
```

All data is stored in the browser with LocalStorage. No backend is required.
