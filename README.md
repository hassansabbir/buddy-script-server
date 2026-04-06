# BuddyScript Server ⚙️

BuddyScript Server is the robust, high-performance API backend powering the BuddyScript social platform. Engineered thoughtfully with Node.js and TypeScript, this secure API handles complex threaded social interactions, visibility filtering, and media processing.

🔗 **Live Production URL:** [https://buddyscript-server.vercel.app](https://buddyscript-server.vercel.app)

## 🌟 Key Features

- **Entity Relationships & Threads:** Advanced NoSQL relational data handling enabling a full nested structure for Posts -> Comments -> Replies.
- **Privacy & Visibility:** Granular filtering to ensure posts marked as "private" are securely hidden from the feed and returned solely to their authorized creators.
- **Centralized Social Reactions:** Reusable interaction services for toggling "likes" across posts, comments, and replies, dynamically tracked with pre-calculated aggregations (like `commentCount`).
- **Media Uploads:** `multer` integration allowing seamless `multipart/form-data` handling instantly hooked into Cloudinary for cloud-based media delivery.
- **Role-based Authentication:** JWT Access and Refresh tokens securing routes against unauthorized activity and identifying active session actors.
- **Serverless Ready:** Configured to instantly deploy to edge networks & Vercel's Serverless environment out-of-the-box.

## 💻 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB & Mongoose
- **Validation:** Zod
- **Media Hosting:** Cloudinary & Multer
- **Security:** bcrypt, jsonwebtoken, CORS
- **Deployment:** Vercel (@vercel/node)

## 🚀 Getting Started Locally

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root based on your credentials:
   ```env
   PORT=5000
   DATABASE_URL=your_mongodb_cluster_url
   JWT_ACCESS_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=30d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The backend will bootstrap and initialize at `http://localhost:5000`.

## 🛠️ Build & Vercel Deployment

This project uses modern ECMAScript Modules (`type: module`) matched with TypeScript's `NodeNext` resolution. It is configured for direct Vercel Serverless Function deployment via `vercel.json` without standard internal `listen` bindings.

```bash
# Build the TypeScript output
npm run build 

# Deploy to Vercel production
npx vercel --prod
```
