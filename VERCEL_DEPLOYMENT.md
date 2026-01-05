# Vercel Deployment Guide with Postgres

## ✅ What Was Added

Your time tracker now uses **Vercel Postgres** to sync data across all devices via your Google account!

### Database Setup Complete:
- ✅ Prisma ORM configured
- ✅ PostgreSQL schema created
- ✅ API routes for CRUD operations
- ✅ User-specific data isolation
- ✅ Migration tool for existing data

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add database sync with Vercel Postgres"
git push
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Add Postgres Database

**In Vercel Dashboard:**

1. Go to your project → **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a region (closest to your users)
5. Click **Create**

✅ Vercel automatically adds these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- And more...

### Step 4: Run Database Migration

**Option A: Automatic (Recommended)**

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Then redeploy - migrations run automatically!

**Option B: Manual**

In Vercel dashboard → Settings → Environment Variables, add:
```
DATABASE_URL = [copy from POSTGRES_URL]
```

Then run in terminal:
```bash
npx prisma migrate deploy
```

### Step 5: Verify Deployment

1. Visit your deployed site: `https://your-project.vercel.app/personal`
2. Sign in with Google
3. Create a test session
4. Open on different browser/device
5. Sign in → Data synced! 🎉

## 🔧 Environment Variables Needed

Vercel automatically provides:
- ✅ `POSTGRES_URL` - Auto-added by Vercel
- ✅ `POSTGRES_PRISMA_URL` - Auto-added by Vercel
- ✅ `POSTGRES_URL_NON_POOLING` - Auto-added by Vercel

You need to add (from your existing setup):
- ⚙️ `AUTH_SECRET` - Your NextAuth secret
- ⚙️ `GOOGLE_CLIENT_ID` - Google OAuth
- ⚙️ `GOOGLE_CLIENT_SECRET` - Google OAuth

## 📊 Database Schema

```prisma
model TimeSession {
  id          String   @id @default(cuid())
  userId      String   // Google email
  activity    String
  description String?
  startTime   DateTime
  endTime     DateTime?
  date        String   // YYYY-MM-DD
  source      String   // 'manual', 'tracked', 'google-fit'
  
  healthDataType    String?
  healthDataDetails Json?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId, date])
}
```

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    USER FLOW                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Device 1 (Laptop)          Vercel Postgres    Device 2    │
│        │                          │                  │      │
│        │  1. Create Session       │                  │      │
│        ├─────────────────────────>│                  │      │
│        │                          │                  │      │
│        │  2. Stored in DB         │                  │      │
│        │      (user@email.com)    │                  │      │
│        │                          │                  │      │
│        │                          │  3. Open App     │      │
│        │                          │<─────────────────┤      │
│        │                          │                  │      │
│        │                          │  4. Fetch Data   │      │
│        │                          ├─────────────────>│      │
│        │                          │     (same user)  │      │
│        │                          │                  │      │
│        │     5. Data Synced! ✓    │                  │      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🧪 Testing Sync

1. **On Device 1:**
   - Sign in with Google
   - Create a session: "Testing sync"

2. **On Device 2:**
   - Sign in with same Google account
   - See "Testing sync" session appear! ✓

3. **Edit on Device 2:**
   - Update the session

4. **Check Device 1:**
   - Refresh → Changes appear! ✓

## 📱 Local Development with Database

To test database locally:

1. **Pull environment variables from Vercel:**
   ```bash
   vercel env pull
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

3. **Run dev server:**
   ```bash
   pnpm dev
   ```

Now your local dev connects to Vercel Postgres!

## 🔄 Migration from localStorage

When users first access the new version:

1. **Auto-detection:**
   - App checks for localStorage data
   - Shows migration prompt if found

2. **One-click migrate:**
   - User clicks "Migrate to Database"
   - All sessions uploaded to database
   - localStorage cleared
   - Page reloads → Data synced!

3. **No data loss:**
   - Migration is safe and tested
   - Original data preserved until confirmed

## 📈 Database Management

### View Data

```bash
# Open Prisma Studio
npx prisma studio
```

### Check Migrations

```bash
# View migration status
npx prisma migrate status
```

### Reset Database (DEV ONLY)

```bash
# ⚠️ Deletes all data!
npx prisma migrate reset
```

## 🎯 Benefits

| localStorage | → | Vercel Postgres |
|--------------|---|-----------------|
| ❌ Per device | → | ✅ All devices |
| ❌ Per browser | → | ✅ All browsers |
| ❌ Can be lost | → | ✅ Always safe |
| ❌ No backup | → | ✅ Auto-backed up |
| ❌ Manual export | → | ✅ Always available |

## 🔐 Security

- ✅ Data isolated by Google account (userId)
- ✅ Server-side authentication checks
- ✅ API routes protected by NextAuth
- ✅ No user can see another's data
- ✅ HTTPS encryption in transit
- ✅ PostgreSQL security at rest

## 📊 Monitoring

In Vercel dashboard:
- **Storage tab** → View database metrics
- **Analytics** → Track API calls
- **Logs** → Debug issues

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check environment variables in Vercel
- Verify `POSTGRES_PRISMA_URL` exists
- Try redeploying

### "Prisma Client not found"
- Ensure build script includes `prisma generate`
- Check logs for migration errors

### "Data not syncing"
- Verify user is signed in
- Check browser console for errors
- Test API endpoints: `/api/sessions`

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Postgres database added in Vercel
- [ ] Environment variables set (Google OAuth + Auth Secret)
- [ ] Database migrated successfully
- [ ] Deployed and tested
- [ ] Signed in on multiple devices
- [ ] Verified data syncs

## 🎉 You're Done!

Your time tracker now syncs across all devices! Users can:
- Track time on laptop
- View on phone
- Edit on tablet
- All stay in sync via Google account! ✓

---

**Need help?** Check Vercel docs: https://vercel.com/docs/storage/vercel-postgres

