# Hlass
One-stop curriculum resource for Haas undergraduate students

## 🔨 Setting Up
Clone repo
```bash
git clone git@github.com:xyntechx/hlass.git
```

Install dependencies
```bash
pnpm i
```

Add the `.env.local` file found in Discord to your local repo's root directory.

## 📚 Useful Commands
Run locally
```bash
pnpm dev
```

Build app
```bash
pnpm build
```

Generate Supabase types
```bash
pnpm dlx supabase gen types typescript --project-id yxppenxnssfoprnfiaso > database.types.ts
```

## 🚀 Deployment
We're currently using Vercel to host our website. Every time a new commit is added to `main`, a new build is deployed in Vercel.

URL: https://hlass.vercel.app/

Supabase: https://supabase.com/dashboard/project/yxppenxnssfoprnfiaso

## 💻 Contribution Guidelines
- Don't directly push to `main`; always create a new branch and make a PR before merging to `main`
- Try your best to make your code as bug free as possible before making a PR
