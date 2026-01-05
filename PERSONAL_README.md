# Personal Task Manager

A secure, feature-rich task management system with Google OAuth authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js and pnpm installed
- Google Cloud account for OAuth credentials

### Setup (3 Easy Steps)

**1. Run the setup script:**
```bash
./setup-personal.sh
```

**2. Get Google OAuth Credentials:**
- Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Create OAuth 2.0 Client ID
- Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Secret to `.env.local`

**3. Start the server:**
```bash
pnpm dev
```

Visit: **http://localhost:3000/personal**

## ✨ Features

### Authentication
- ✅ Google OAuth 2.0 integration
- ✅ Secure session management
- ✅ Protected routes via middleware

### Task Management
- ✅ **Create** tasks with title, description, status, and priority
- ✅ **Edit** tasks inline
- ✅ **Delete** tasks with one click
- ✅ **Update status** by clicking badges (Todo → In Progress → Completed)
- ✅ **Set priority** levels (Low, Medium, High)
- ✅ **Auto-save** to browser localStorage
- ✅ **Timestamps** for created and updated dates

### User Interface
- ✅ Modern dark theme matching portfolio
- ✅ Statistics dashboard (task counts by status)
- ✅ Color-coded status badges and priorities
- ✅ Responsive mobile design
- ✅ User profile in header
- ✅ Smooth transitions and hover effects
- ✅ Empty state handling

## 📁 File Structure

```
src/
├── auth.ts                              # NextAuth configuration
├── middleware.ts                        # Route protection
├── types/task.ts                        # TypeScript definitions
├── hooks/useTaskManager.ts              # Task state management
├── components/
│   ├── TaskCard.tsx                    # Individual task display
│   ├── TaskForm.tsx                    # Create task form
│   └── TaskDashboard.tsx               # Main dashboard
└── app/
    ├── api/auth/[...nextauth]/route.ts # Auth endpoints
    └── personal/
        ├── page.tsx                    # Login page
        └── dashboard/page.tsx          # Dashboard (protected)
```

## 🎨 Task Status Flow

```
Todo (Gray) → In Progress (Purple) → Completed (Green) → Todo (cycles)
```

Click on any status badge to cycle through states.

## 📊 Priority Levels

- **Low** (Blue)
- **Medium** (Yellow) - default
- **High** (Red)

## 💾 Data Storage

Tasks are stored in **browser localStorage**:
- ✅ Fast and instant
- ✅ No server/database needed
- ✅ Works offline
- ⚠️ Per device/browser (not synced)

## 🔐 Security

- Middleware protects `/personal/dashboard` route
- Server-side authentication checks
- Secure OAuth flow with Google
- CSRF protection via NextAuth
- No sensitive data exposed to client

## 🎯 Usage

1. **Sign in** with Google account
2. **Create tasks** using the "Add New Task" button
3. **Organize** tasks by status and priority
4. **Edit** tasks by clicking the edit icon
5. **Update status** by clicking status badges
6. **Delete** tasks with the trash icon
7. **Sign out** using the logout button in header

## 📚 Documentation

- `PERSONAL_SETUP.md` - Detailed setup guide
- `USER_FLOW.md` - User flows and diagrams
- `.env.example` - Environment variables template
- `setup-personal.sh` - Automated setup script

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** NextAuth.js v5
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Storage:** Browser localStorage
- **Language:** TypeScript

## 🐛 Troubleshooting

### "Error: Invalid redirect URI"
Make sure you added the exact redirect URI in Google Console:
```
http://localhost:3000/api/auth/callback/google
```

### "Environment variables missing"
Run `./setup-personal.sh` and add your Google credentials to `.env.local`

### Tasks not persisting
Tasks are stored per browser/device. Check browser localStorage permissions.

## 🚀 Deployment

For production deployment:

1. Update `.env.local` with production values:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. Add production redirect URI in Google Console:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

3. Deploy to your hosting platform (Vercel, etc.)

## 📝 License

Part of Samuel Baumgartner's portfolio project.

## 🤝 Support

For issues or questions, see the detailed documentation files or contact the maintainer.

---

**Enjoy tracking your tasks! 🎉**


