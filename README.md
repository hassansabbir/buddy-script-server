# 🚀 BuddyScript Backend

BuddyScript is a modern, high-performance social media backend built with Node.js, Express, and TypeScript. It features a modular architecture, robust authentication, and a scalable feed system.

---

## ✨ Features

- **🔐 Secure Authentication**: JWT-based (Access & Refresh Tokens) with bcrypt password hashing.
- **📱 Modular Architecture**: Clean separation of concerns (Interface -> Model -> Service -> Controller -> Route).
- **📝 Feed System**: Create, read, and interact with posts, comments, and nested replies.
- **🖼️ Media Integration**: Support for image and video uploads via **Cloudinary**.
- **✅ Robust Validation**: Input validation using **Zod** schemas.
- **🚨 Global Error Handling**: Centralized middleware for consistent API responses and error reporting.
- **📁 Environment-Driven**: Easy configuration management through `.env` files.
- **✨ Eye-Catching Logs**: Professional terminal output with status banners and IP detection.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Auth**: [JWT](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Media**: [Cloudinary](https://cloudinary.com/) & [Multer](https://github.com/expressjs/multer)
- **Logging**: [Morgan](https://www.npmjs.com/package/morgan) & [Chalk](https://www.npmjs.com/package/chalk)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd buddyscript-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
NODE_ENV=development

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Development Server
```bash
npm run dev
```
The API will be available at `http://localhost:5000` and your local network IP!

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── config/          # Environment & Cloudinary configurations
│   ├── middlewares/     # Auth, Errors & common logic
│   ├── routes/          # Central API routing
│   └── utils/           # Shared utilities (catchAsync, sendResponse)
└── modules/             # Business logic split by domain
    ├── auth/            # Login/Register strategies
    ├── user/            # Profile & user management
    ├── post/            # Post feeds & reactions
    ├── comment/         # Post discussions
    └── reply/           # Threaded conversations
```

---

## 📡 API Endpoints (Base URL: `/api`)

- **Auth**: `/auth/register`, `/auth/login`
- **Users**: `/users`, `/users/:id`
- **Posts**: `/posts`, `/posts/:id`, `/posts/:id/like`
- **Comments**: `/comments`, `/comments/:postId`
- **Replies**: `/replies`, `/replies/:commentId`

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
