# Deployment Guide

This portfolio is built with React and Vite, making it perfect for hosting on modern platforms like Netlify or Vercel.

## Option 1: Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click "New Project" and import your repository.
4. Vercel will automatically detect Vite. Click **Deploy**.
5. Your site will be live in seconds!

## Option 2: Netlify
1. Push your code to a GitHub repository.
2. Go to [netlify.com](https://app.netlify.com) and sign in.
3. Click "Add new site" > "Import an existing project".
4. Select your GitHub repository.
5. Set the build command to `npm run build` and publish directory to `dist`.
6. Click **Deploy site**.

## Manual Build
If you want to build the project locally for manual hosting:
```bash
npm run build
```
The production-ready files will be in the `dist` folder.
