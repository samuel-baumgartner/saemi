# Personal Task Manager Setup

## Google OAuth Setup

To enable Google authentication for the `/personal` route, you need to set up Google OAuth credentials:

### 1. Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen if prompted
6. For Application type, select "Web application"
7. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```env
   AUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. Generate a secure `AUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

### 3. Run the Application

```bash
pnpm dev
```

Visit `http://localhost:3000/personal` to access the task manager.

## Features

- **Google Authentication**: Secure sign-in with Google OAuth
- **Task Management**: Create, edit, update, and delete tasks
- **Task Status**: Track tasks as "To Do", "In Progress", or "Completed"
- **Priority Levels**: Assign Low, Medium, or High priority to tasks
- **Local Storage**: Tasks are stored in browser localStorage (per user device)
- **Responsive Design**: Works on desktop and mobile devices

## Routes

- `/personal` - Login page
- `/personal/dashboard` - Task management dashboard (protected)

## Security

- Routes under `/personal` (except the login page) are protected by middleware
- Only authenticated users can access the dashboard
- Tasks are stored locally in the browser (localStorage)




