# 🧭 UNISYNC

*A collaborative web platform for syncing calendars and events across departments at Mahindra University.*
Built with **TypeScript**, **JavaScript**, **Google OAuth**, and **Node.js**.

---

## 🚀 Getting Started

Follow these steps to run the project locally:
While cloning the repository, make sure, you have the correct versions of the packages, according to the package.json file, and use "packageManager": "pnpm@10.4.1", version to proceed with accessing the application, you can use any of the branches frontend or Version3.1

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

Local:    http://localhost:3000
Network:  http://172.16.0.2:3000
Environments: .env
```

👉 **Click on the link**, and it will open your app in the browser.

The web application has to successfully login with Google Credentials, however, since the web application is still in the Testing phase, the security setting do not allow external users to log in to the system, specifically anyone apart from the team members trying to sign-in using their Google Credentials, thus, we request you to use the above login form - that allows you to input the credentials of a dummy user, that allows you to access the website

 Email - asha@mu.edu
 Password - $2b$12$KIX/2r2PMR9r1RNoUQ2y3O.Ts8eEZ.vc5H5SLh/8ZdEz2nIR.7zZe

Once you are logged in, you'll be able to use the web application, and if there's any functionality error or delay, wait for them to be reflected, and try restarting the server.


---

🎉 **YOU’RE ALL SET!**
Happy syncing 🗓️✨


Additional notes for evaluation:

Also due to short time duration for presentation, we couldn't mention much about our requirement elicitation process, we went to Dr.Meraj Alam to understand the domain knowledge to sync calendars and also spoke regarding the same with our mentor Prof.Murali Krishna Bukkasamudram.

The previous version of the application 1.1, 2.1 have been deployed, however in the version 3.1 has a few dependency conflicts which are to be fixed, then the deployment can be done seemlessly. 

Over the course of the project we had to migrate to different technologies other than frontend and backend(which remains as promised), but for database we had to shift to postgresql neondb/serverless 

---


