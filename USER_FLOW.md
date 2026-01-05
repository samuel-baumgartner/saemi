# Personal Task Manager - User Flow

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  User visits: http://localhost:3000/personal                   │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ Authenticated? │
                    └────────┬───────┘
                             │
                ┌────────────┴────────────┐
                │                         │
               NO                        YES
                │                         │
                ▼                         ▼
    ┌───────────────────────┐   ┌────────────────────┐
    │   Login Page          │   │  Redirect to       │
    │   /personal           │   │  /personal/        │
    │                       │   │  dashboard         │
    │   [Sign in with       │   └────────────────────┘
    │    Google button]     │
    └───────────┬───────────┘
                │ Click
                ▼
    ┌───────────────────────┐
    │   Google OAuth        │
    │   Login Screen        │
    └───────────┬───────────┘
                │ Success
                ▼
    ┌───────────────────────┐
    │   Redirect to         │
    │   /personal/          │
    │   dashboard           │
    └───────────────────────┘
```

## 📋 Task Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     DASHBOARD VIEW                              │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Header                                                    │ │
│  │  [Home] Task Manager    [Avatar] [Name] [Email] [Logout]  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │   To Do     │ │ In Progress │ │  Completed  │              │
│  │     5       │ │      3      │ │      12     │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │         [+] Add New Task                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                    │ Click                                      │
│                    ▼                                            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  New Task Form                                            │ │
│  │  Title: [________________]                                │ │
│  │  Description: [_______________]                           │ │
│  │  Status: [Todo ▼]  Priority: [Medium ▼]                  │ │
│  │  [Create Task]                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                    │ Submit                                     │
│                    ▼                                            │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ╔═══════════════════════════════════════╗                │ │
│  │ ║ Task Title              [Edit] [Del]  ║                │ │
│  │ ║ Description text here                 ║                │ │
│  │ ║ [todo] [medium] Date                  ║                │ │
│  │ ╚═══════════════════════════════════════╝                │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Task Actions:                                                  │
│  • Click [Edit] → Edit inline                                  │
│  • Click [Delete] → Remove task                                │
│  • Click [Status Badge] → Cycle: todo → in-progress →         │
│                           completed → todo                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Task Status Cycle

```
┌──────────┐      Click       ┌──────────────┐      Click       ┌───────────┐
│   TODO   │ ───────────────> │ IN PROGRESS  │ ───────────────> │ COMPLETED │
│  (Gray)  │                  │  (Purple)    │                  │  (Green)  │
└──────────┘                  └──────────────┘                  └───────────┘
     ▲                                                                  │
     │                         Click                                    │
     └──────────────────────────────────────────────────────────────────┘
```

## 📊 Priority Levels

```
┌─────────┐
│   LOW   │  Blue color
└─────────┘

┌─────────┐
│ MEDIUM  │  Yellow color (default)
└─────────┘

┌─────────┐
│  HIGH   │  Red color
└─────────┘
```

## 💾 Data Storage

```
┌──────────────┐
│   Browser    │
│  localStorage│  ← Tasks saved automatically
│              │    on every change
│ Key: "tasks" │
└──────────────┘

Note: Tasks are stored per browser/device
      (not synced across devices)
```

## 🔄 Component Interaction

```
Dashboard Page (Server Component)
    │
    ├── Checks authentication
    │
    └── Renders:
         │
         ├── Header (with user info & logout)
         │
         └── TaskDashboard (Client Component)
              │
              ├── useTaskManager Hook
              │    └── Manages state & localStorage
              │
              ├── Stats Display
              │
              ├── TaskForm
              │    └── Creates new tasks
              │
              └── TaskCard (for each task)
                   ├── Display task info
                   ├── Edit inline
                   ├── Delete task
                   └── Update status
```

## 🚀 Getting Started

1. **First Time Setup:**
   ```
   ./setup-personal.sh
   ```

2. **Add Google Credentials:**
   Edit `.env.local` with your OAuth credentials

3. **Start Server:**
   ```
   pnpm dev
   ```

4. **Access App:**
   Visit `http://localhost:3000/personal`

5. **Sign In:**
   Click "Sign in with Google"

6. **Start Managing Tasks:**
   - Create your first task
   - Organize by status
   - Track your progress!

## 🎯 Key Features at a Glance

✅ **Secure** - Google OAuth authentication
✅ **Simple** - Intuitive task management
✅ **Fast** - Client-side storage, no server delays
✅ **Beautiful** - Modern dark theme UI
✅ **Responsive** - Works on all devices
✅ **Organized** - Tasks grouped by status
✅ **Flexible** - Edit tasks inline
✅ **Visual** - Color-coded priorities and statuses
