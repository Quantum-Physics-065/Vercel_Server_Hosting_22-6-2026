# MERN Express Server

This project includes:
- Express + MongoDB backend setup
- JWT authentication routes
- User profile routes
- Post CRUD routes
- File upload handling
- Health and ack endpoints
- Static uploads serving from `/uploads`

## Setup
1. Run `npm install`
2. Copy `.env.example` to `.env`
3. Update `MONGO_URI` and `JWT_SECRET`
4. Start the server with `npm run dev`

## Main endpoints
- GET `/api/ack`
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/health`
- GET `/api/posts`
- POST `/api/files/upload`
