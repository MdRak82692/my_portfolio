# 🚀 Quick Start Guide

## ধাপ ১: MongoDB চালু করুন

আপনার local MongoDB server চালু করুন। যদি MongoDB install না থাকে, তাহলে [MongoDB Download](https://www.mongodb.com/try/download/community) থেকে download করুন।

```bash
# Windows এ MongoDB চালু করতে
mongod
```

অথবা MongoDB Atlas (cloud) ব্যবহার করতে পারেন। সেক্ষেত্রে `.env` file এ connection string update করুন।

## ধাপ ২: Admin User তৈরি করুন

```bash
# Portfolio folder এ যান
cd d:/Project/portfolio

# Admin user create করুন
npm run create-admin
```

এটি একটি admin user তৈরি করবে:
- **Email:** admin@portfolio.com (`.env` file এ `ADMIN_EMAIL` থেকে)
- **Password:** admin123 (`.env` file এ `ADMIN_PASSWORD` থেকে)

💡 **Note:** আপনি চাইলে `.env` file এ `ADMIN_EMAIL` এবং `ADMIN_PASSWORD` change করতে পারবেন।


## ধাপ ৩: Backend Server চালু করুন

```bash
# Same folder থেকে (d:/Project/portfolio)
npm run dev
```

Backend চলবে: `http://localhost:5000`

## ধাপ ৪: Frontend চালু করুন

নতুন terminal window open করুন:

```bash
# Client folder এ যান
cd d:/Project/portfolio/client

# Frontend চালু করুন
npm run dev
```

Frontend চলবে: `http://localhost:5173`

## ধাপ ৫: Login করুন এবং Content Add করুন

1. Browser এ যান: `http://localhost:5173`
2. উপরে "Dashboard" button এ click করুন
3. Login credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
4. Dashboard থেকে আপনার portfolio data add করুন:
   - Profile information
   - Projects
   - Skills
   - Experience

## ধাপ ৬: Portfolio দেখুন

Dashboard এর sidebar থেকে "View Portfolio" এ click করুন অথবা সরাসরি `http://localhost:5173` এ যান।

---

## 🎯 পরবর্তী পদক্ষেপ

1. **Profile Update করুন:** Dashboard → Profile
2. **Projects Add করুন:** Dashboard → Projects → Add Project
3. **Skills Add করুন:** Dashboard → Skills → Add Skill
4. **Experience Add করুন:** Dashboard → Experience → Add Experience

## ⚠️ গুরুত্বপূর্ণ নোট

- প্রথম login এর পর password change করুন
- Production এ deploy করার আগে `.env` file এ strong JWT secret use করুন
- Image upload করার সময় file size 5MB এর নিচে রাখুন

## 🐛 সমস্যা হলে

### MongoDB Connection Error
- MongoDB running আছে কিনা check করুন
- `.env` file এ MongoDB URI সঠিক আছে কিনা verify করুন

### Port Already in Use
- Backend: `.env` file এ PORT change করুন
- Frontend: `client/vite.config.js` এ port change করুন

### Login না হলে
- Backend server running আছে কিনা check করুন
- Browser console এ error আছে কিনা দেখুন
- Network tab এ API call successful হচ্ছে কিনা check করুন

---

**এখন আপনার portfolio website সম্পূর্ণ ready! 🎉**
