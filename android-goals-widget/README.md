# Saemi daily goals — Android home screen widget

Read-only list of your daily goals with the same progress rules as the web app (`minutesTowardGoal` on the server).

## 1. Server configuration

In your Saemi Next.js deployment, set (see `.env.example` in the repo root):

- **`WIDGET_API_TOKEN`** — long random secret (e.g. `openssl rand -hex 32`).
- **`WIDGET_USER_ID`** — your Prisma `userId`, i.e. the **same email** you use to sign in with Google at `/personal`.

Redeploy so `GET /api/widget/daily-goals` is available (Bearer token auth).

The widget sends your phone’s **local calendar date** as `?date=YYYY-MM-DD` so “today” matches the device, not the server clock.

## 2. Install the app

### Option A — No Android Studio (download an APK from GitHub)

Use this if you do not want to install Android Studio on your computer.

1. Push this repo to **GitHub** (if it is not there yet).
2. Open the repo on GitHub → **Actions** → workflow **“Build Saemi Goals widget APK”**.
3. If it has not run yet, open the workflow → **Run workflow** (or push any change under `android-goals-widget/`).
4. When the run finishes, open it → scroll to **Artifacts** → download **`saemi-goals-widget-debug-apk`** (ZIP).
5. Unzip on your computer. You get **`app-debug.apk`**.
6. Copy the APK to your phone (USB, Drive, email, etc.).
7. On the phone, open the APK file. Allow **Install unknown apps** for that app (Files, Chrome, etc.) if Android asks.
8. Install. The app is named **Saemi Goals**.

### Option B — Android Studio + USB

1. Install [Android Studio](https://developer.android.com/studio) (includes JDK and SDK).
2. **File → Open** → select the folder `android-goals-widget`.
3. Wait for Gradle sync, plug in the phone, enable **USB debugging**.
4. Press **Run** (green play). That installs **Saemi Goals** on the device.

### Option C — Command line (JDK + Android SDK already installed)

```bash
cd android-goals-widget
./gradlew installDebug
```

## 3. Place the widget

1. Long-press the home screen → **Widgets**.
2. Find **Saemi daily goals** and drag it to the home screen.
3. When prompted, enter:
   - **Server URL** — base URL only, no path. Use the URL you actually open in the browser (if that is `https://www.…`, use that). Apex→www redirects used to drop the auth header in older builds; the app now re-sends `Authorization` after each redirect.
   - **Widget API token** — the same value as `WIDGET_API_TOKEN`.
4. Tap **Save**. Use **Refresh** on the widget if data does not appear immediately.

You can open the **Saemi Goals** app from the launcher anytime to change URL or token.

## Updates

The widget also refreshes on the interval allowed by Android (about every 30 minutes) and when you tap **Refresh**.
