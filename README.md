# AI Learning Platform

A full-stack AI-powered learning platform with user management, categories, and admin dashboard.

---

## Technologies Used

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **Other:** OpenAI API, Docker (for database), concurrently

---

## Assumptions Made

- The project uses OpenAI API for AI-powered features. You must provide your own API key.
- MongoDB is required and can be run locally or via Docker.
- The admin password is set to `ADMIN` by default.
- The backend and frontend are run separately in development.

---

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone https://github.com/HadasaOzer/ai-learning-platform.git
   ```

2. **Open the project in VS Code.**

3. **Create a `.env` file in the `backend` folder:**

   - Copy the contents from `backend/.env.example` into `backend/.env`.
   - Replace `OPENAI_API_KEY=your_openai_api_key` with your actual OpenAI API key.

4. **Install dependencies:**

   In the project root (`ai-learning-platform`):

   ```
   npm install
   ```

   Then run:

   ```
   npx concurrently "cd backend && npm install" "cd frontend && npm install"
   ```

5. **Start the project:**

   ```
   npx concurrently "cd backend && npx ts-node src/server.ts" "cd frontend && npm start"
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000)  
   The backend will run on [http://localhost:5000](http://localhost:5000)

---

## Running MongoDB with Docker (Recommended)

If you don't have MongoDB installed locally, you can spin it up with Docker:

1. Make sure you have Docker installed.
2. In the project root, run:

   ```
   docker-compose up -d
   ```

   This will start a MongoDB instance on port 27017.

---

## How to Use the Platform

1. **Admin Access:**
   - Go to the Admin Access page and enter the password: `ADMIN`.

2. **Manage Categories:**
   - Click on "Manage Categories" to add categories and subcategories.

3. **Register as a User:**
   - Go to the Register page, sign up, and log in as a user.
   - Choose categories, ask questions, and view your question history.

4. **Admin User Management:**
   - Log in again as admin (password: `ADMIN`).
   - Click on "User Management" to manage and track users.

---

## Notes

- Make sure to update your `.env` file with a valid OpenAI API key.
- The analytics, AI settings, and backup features are for demonstration only and are not fully functional.
- For any issues, please open an issue on the [GitHub repository](https://github.com/DassiOzer/ai-learning-platform).
