# 🧭 UNISYNC

*A collaborative web platform for syncing calendars and events across departments at Mahindra University.*
Built with **TypeScript**, **JavaScript**, **Google OAuth**, and **Node.js**.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/MASTERxD-2/UNISYNC_
cd UNISYNC_
```

### 📦 2. Install Dependencies

Ensure you have **Node.js** installed, then run:

```bash
pnpm install
```

### 🔐 3. Set Up Environment Variables

Create a file named `.env` in the root `UNISYNC_` folder, and paste the following:

```env
# 🌐 Database Configuration
DATABASE_URL='postgresql://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require'
DATABASE_URL_UNPOOLED='postgresql://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require'

PGHOST='<HOST>'
PGDATABASE='<DB_NAME>'
PGUSER='<USERNAME>'
PGPASSWORD='<PASSWORD>'

# 🛠️ Postgres Templates (Vercel, Prisma)
POSTGRES_URL='postgres://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require'
POSTGRES_URL_NON_POOLING='postgres://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require'
POSTGRES_USER='<USERNAME>'
POSTGRES_HOST='<HOST>'
POSTGRES_PASSWORD='<PASSWORD>'
POSTGRES_DATABASE='<DB_NAME>'
POSTGRES_URL_NO_SSL='postgres://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>'
POSTGRES_PRISMA_URL='postgres://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?connect_timeout=15&sslmode=require'

# 🔑 Secrets
JWT_SECRET='<JWT_SECRET>'
NEXTAUTH_SECRET='<NEXTAUTH_SECRET>'

# 🔓 Google OAuth
GOOGLE_CLIENT_ID='<GOOGLE_CLIENT_ID>'
GOOGLE_CLIENT_SECRET='<GOOGLE_CLIENT_SECRET>'

# 🌍 Auth URL
NEXTAUTH_URL=http://localhost:3000
```

✅ Save the file!

---

### 🧭 4. Navigation & Running the App

In your terminal, run:

```bash
cd UNISYNC
pnpm dev
```

You’ll see a message like:

```bash
▲ Next.js 15.3.1 (Turbopack)

Local:    http://localhost:3001
Network:  http://172.16.0.2:3001
Environments: .env
```

👉 **Click on the link**, and it will open your app in the browser.

---

🎉 **YOU’RE ALL SET!**
Happy syncing 🗓️✨

---


