# How to Publish `schedulepro-calendar` to npm

**Developed & Designed by Mohammad Saquib Khan**

---

## Prerequisites

- Node.js ≥ 18
- An npm account — create one free at https://www.npmjs.com/signup

---

## Step 1 — Update your details in package.json

Open `package.json` and replace the placeholder values:

```json
"author": {
  "name": "Mohammad Saquib Khan",
  "email": "your-actual-email@example.com",
  "url": "https://github.com/YOUR_GITHUB_USERNAME"
},
"homepage": "https://github.com/YOUR_GITHUB_USERNAME/schedulepro-calendar#readme",
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_GITHUB_USERNAME/schedulepro-calendar.git"
}
```

---

## Step 2 — Install build dependencies

```bash
cd schedulepro-calendar
npm install
```

---

## Step 3 — Build the library

```bash
npm run build:all
```

This runs two things:
1. `tsup` — compiles TypeScript → `dist/index.js` (CJS), `dist/index.esm.js` (ESM), and `dist/index.d.ts` (types)
2. Copies `src/styles/calendar.css` → `dist/styles.css`

Verify the `dist/` folder contains:
```
dist/
  index.js        ← CommonJS build
  index.esm.js    ← ES Module build
  index.d.ts      ← TypeScript declarations
  styles.css      ← Stylesheet
```

---

## Step 4 — Check what will be published

```bash
npm pack --dry-run
```

You should see only: `dist/`, `README.md`, `LICENSE`, `package.json`.  
If you see `src/` or `node_modules/`, check your `.npmignore`.

---

## Step 5 — Log in to npm

```bash
npm login
```

Enter your npm username, password, and email. If you have 2FA enabled, enter your OTP.

---

## Step 6 — Publish

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (`@username/package-name`).  
For unscoped packages like `schedulepro-calendar` it's optional but safe to include.

Your package is now live at:
```
https://www.npmjs.com/package/schedulepro-calendar
```

---

## Step 7 — Install and use it

Anyone can now install your calendar with:

```bash
npm install schedulepro-calendar
```

And use it:

```tsx
import { ReservationCalendar } from 'schedulepro-calendar'
import 'schedulepro-calendar/styles'

export default function App() {
  return <ReservationCalendar staff={[]} defaultTheme="light" />
}
```

---

## Updating the package (publishing a new version)

```bash
# Bump version (choose: patch | minor | major)
npm version patch     # 1.0.0 → 1.0.1  (bug fixes)
npm version minor     # 1.0.0 → 1.1.0  (new features, backwards compatible)
npm version major     # 1.0.0 → 2.0.0  (breaking changes)

# Rebuild and publish
npm run build:all
npm publish --access public
```

---

## Optional — Scoped package name

If you want to publish under your own npm username namespace (e.g. `@saquib/schedulepro-calendar`):

1. Change `"name"` in `package.json`:
   ```json
   "name": "@saquib/schedulepro-calendar"
   ```

2. Publish with:
   ```bash
   npm publish --access public
   ```

3. Users install with:
   ```bash
   npm install @saquib/schedulepro-calendar
   ```

---

## Optional — Push source to GitHub first

```bash
git init
git add .
git commit -m "feat: initial release v1.0.0"
git remote add origin https://github.com/YOUR_USERNAME/schedulepro-calendar.git
git push -u origin main
```

This gives your npm page a working repository link and lets users report issues.
