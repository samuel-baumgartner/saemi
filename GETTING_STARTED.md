# Getting Started with Personal Task Manager

## Overview

You now have a fully functional task management system at `/personal` with Google authentication!

## Step-by-Step Setup

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Personal Task Manager (or your choice)
   - User support email: Your email
   - Developer contact: Your email
6. For Application type, select **Web application**
7. Add Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production (later): `https://yourdomain.com/api/auth/callback/google`
8. Click **Create**
9. **Copy** the Client ID and Client Secret

### Step 2: Configure Environment Variables

**Option A: Use the setup script (recommended)**
```bash
./setup-personal.sh
```
Then edit `.env.local` and add your Google credentials.

**Option B: Manual setup**
```bash
# Copy the template
cp .env.example .env.local

# Generate a secret key
openssl rand -base64 32

# Edit .env.local and add:
AUTH_SECRET=<paste-the-generated-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

Your `.env.local` should look like:
```env
AUTH_SECRET=abcd1234yoursecretkey5678efgh...
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789...
```

### Step 3: Start the Development Server

```bash
pnpm dev
```

You should see:
```
▲ Next.js 16.x.x
- Local:        http://localhost:3000
- ready in X ms
```

### Step 4: Access the Task Manager

Open your browser and visit:
```
http://localhost:3000/personal
```

You should see a login page with a "Sign in with Google" button.

### Step 5: Sign In

1. Click **Sign in with Google**
2. Choose your Google account
3. Grant permissions
4. You'll be redirected to `/personal/dashboard`

### Step 6: Start Managing Tasks!

Now you can:
- ✅ Click **"Add New Task"** to create tasks
- ✅ Fill in title, description, status, and priority
- ✅ Click **Edit** icon to modify tasks
- ✅ Click **status badges** to cycle: Todo → In Progress → Completed
- ✅ Click **Delete** icon to remove tasks
- ✅ View statistics at the top
- ✅ See tasks organized by status

## Features Guide

### Creating Tasks

1. Click "Add New Task" button
2. Enter:
   - **Title** (required): Brief task name
   - **Description** (optional): More details
   - **Status**: Todo, In Progress, or Completed
   - **Priority**: Low, Medium, or High
3. Click "Create Task"

### Editing Tasks

1. Hover over a task card
2. Click the **Edit** icon (pencil)
3. Modify title and/or description
4. Click the **Check** icon to save

### Updating Status

Click the status badge on any task:
- Gray "todo" → Purple "in-progress" → Green "completed" → back to Gray

### Setting Priority

Choose priority when creating a task:
- **Low**: Blue badge
- **Medium**: Yellow badge (default)
- **High**: Red badge

### Deleting Tasks

1. Hover over a task
2. Click the **Trash** icon
3. Task is immediately removed

## Understanding the Dashboard

### Header
- **Home icon**: Returns to main portfolio
- **Task Manager**: Title
- **Avatar**: Your Google profile picture
- **Name/Email**: Your account info
- **Logout**: Sign out button

### Statistics
Three cards showing count of tasks by status:
- To Do (gray)
- In Progress (purple)
- Completed (green)

### Task Lists
Tasks are grouped by status for easy organization.

## Data Storage

- Tasks are stored in **browser localStorage**
- Each browser/device has its own task list
- Tasks persist between sessions
- No server database required
- Tasks are NOT synced across devices

## Tips & Tricks

💡 **Quick status change**: Click status badges instead of editing

💡 **Priority colors**: Use colors for quick visual scanning

💡 **Organize by status**: Tasks auto-group by status

💡 **Empty state**: Don't worry if you see "No tasks yet" - just create your first task!

💡 **Mobile friendly**: Works great on phones and tablets

## Troubleshooting

### "Invalid Client" Error

**Problem**: Google OAuth credentials are incorrect.

**Solution**:
- Double-check Client ID and Secret in `.env.local`
- Ensure no extra spaces or quotes
- Restart dev server: `pnpm dev`

### "Redirect URI Mismatch" Error

**Problem**: Redirect URI not configured in Google Console.

**Solution**:
- Go to Google Cloud Console → Credentials
- Edit your OAuth client
- Add: `http://localhost:3000/api/auth/callback/google`
- Save and try again

### "Environment Variable Missing" Error

**Problem**: `.env.local` not configured.

**Solution**:
- Run `./setup-personal.sh` or manually create `.env.local`
- Ensure all three variables are set
- Restart dev server

### Tasks Not Saving

**Problem**: Browser localStorage disabled or full.

**Solution**:
- Check browser privacy settings
- Clear some localStorage data
- Try a different browser

### Page Not Loading

**Problem**: Dev server not running or port conflict.

**Solution**:
```bash
# Stop the server (Ctrl+C)
# Start again
pnpm dev

# If port 3000 is busy, use a different port:
pnpm dev -p 3001
```

## Next Steps

✅ **Customize**: Modify styles in component files to match your taste

✅ **Extend**: Add more features like:
- Due dates
- Tags/categories
- Search functionality
- Export/import tasks
- Dark/light theme toggle

✅ **Deploy**: When ready, deploy to Vercel or your preferred platform

✅ **Share**: Show off your personal task manager!

## Documentation Files

- `PERSONAL_README.md` - Complete feature overview
- `PERSONAL_SETUP.md` - Detailed setup guide
- `USER_FLOW.md` - User flows and diagrams
- `GETTING_STARTED.md` - This file (step-by-step guide)

## Support

For technical details, see the source code:
- `src/components/` - UI components
- `src/hooks/` - Task management logic
- `src/auth.ts` - Authentication config
- `src/middleware.ts` - Route protection

---

**Happy Task Managing! 🚀**

Need help? Check the other documentation files or review the code comments.
