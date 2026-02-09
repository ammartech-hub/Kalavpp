# Vercel Deployment Guide

## ✅ What's Been Optimized

- ✅ Removed SQLite dependencies (incompatible with Vercel)
- ✅ Configured for PostgreSQL via Supabase
- ✅ Added `.env.example` for environment setup
- ✅ Created `vercel.json` with proper build configuration
- ✅ Set Node version to 20.x via `.nvmrc`
- ✅ Updated build script to include Prisma generation
- ✅ Fixed security vulnerabilities with npm audit

## 🚀 Fast Deployment Steps

### 1. **Prepare Environment Variables in Vercel**

Go to Vercel Project Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@domain.com
DATABASE_URL=your_postgresql_url (from Supabase)
NEXTAUTH_URL=https://your-deploy.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

### 2. **Deploy with One Command**

```bash
vercel deploy --prod
```

Or connect GitHub for automatic deployments:
1. Visit [vercel.com/new](https://vercel.com/new)
2. Select "Import Git Repository"
3. Select your GitHub repo: `ammartech-hub/Kalavpp`
4. Add environment variables from Step 1
5. Click "Deploy"

### 3. **Verify Deployment**

After deployment:
- Check build logs in Vercel dashboard
- Visit your deployed URL
- Verify database connection works

## 📋 Checklist Before Deploying

- [ ] All environment variables set in Vercel
- [ ] Database URL is correct (Supabase pooled connection)
- [ ] NEXTAUTH_SECRET is a secure random string (generate with: `openssl rand -base64 32`)
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] Supabase database migrations are run

## 🔧 Troubleshooting

**Build fails?** Check Vercel logs for specific errors

**Database connection error?** Ensure DATABASE_URL uses pgbouncer connection string from Supabase

**Missing environment variables?** Verify all variables are set in Vercel Settings

## ⚡ Performance Tips

- Images are optimized via Next.js Image Optimization
- Tailwind CSS is minified in production
- API routes auto-scale on Vercel
- Database pooling via Supabase pgbouncer for better performance

---
Repository: https://github.com/ammartech-hub/Kalavpp
