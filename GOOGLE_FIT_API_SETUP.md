# Enable Google Fit API - Quick Guide

## The 403 Error Fix

You're getting a 403 error because the Google Fit API is not enabled in your Google Cloud Console project.

### Steps to Fix:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/library/fitness.googleapis.com
   - Make sure you're in the correct project (the one with your OAuth credentials)

2. **Enable the API:**
   - Click the **"ENABLE"** button
   - Wait for it to activate (takes a few seconds)

3. **Verify it's enabled:**
   - Go to: https://console.cloud.google.com/apis/dashboard
   - You should see "Fitness API" in the list of enabled APIs

4. **Re-authenticate:**
   - Sign out of your app: http://localhost:3000/personal/dashboard (click the logout button)
   - Sign back in
   - Google will ask for fitness permissions again

5. **Try syncing again:**
   - Click "Sync Now" in the Google Fit section
   - Your sleep and workout data should now appear! 🎉

## Alternative: Check if API is already enabled

If the API is already enabled, the issue might be that you signed in BEFORE we added the fitness scopes. In that case:

1. **Clear your session:**
   - Sign out of the app
   - Clear your browser cookies for localhost:3000 (or use incognito mode)

2. **Sign in again:**
   - The consent screen should now ask for Fitness permissions
   - Make sure to approve all permissions

## Troubleshooting

If you still get 403 errors:

1. **Check the OAuth consent screen scopes:**
   - Go to: https://console.cloud.google.com/apis/credentials/consent
   - Click "EDIT APP"
   - Scroll to "Scopes"
   - Make sure these are added:
     - `.../auth/fitness.activity.read`
     - `.../auth/fitness.sleep.read`
     - `.../auth/fitness.heart_rate.read`

2. **Check your test users:**
   - In the OAuth consent screen
   - Make sure `samuel.baumgartner@ebmnet.ch` is listed as a test user

3. **Wait a few minutes:**
   - Sometimes Google takes a few minutes to propagate API changes




