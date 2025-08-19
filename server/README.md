# Devs-Repo Backend

A Node.js + TypeScript + Express backend API for the Developers Repository project.

## Features

- TypeScript support
- Express.js framework
- PostgreSQL database with TypeORM
- RESTful API endpoints
- Developer management (CRUD operations)

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

### Option 1: Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment configuration:**

   - Copy `env.example` to `.env`
   - Update the database credentials in `.env`

3. **Database setup:**

   - Create a PostgreSQL database named `devs_repo`
   - The application will automatically create tables on first run

4. **Run the application:**

   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

### Option 2: Docker Development

1. **Start only the database:**

   ```bash
   npm run docker:db
   ```

2. **Run the application locally (connects to Docker DB):**

   ```bash
   npm run dev
   ```

3. **Stop the database:**
   ```bash
   npm run docker:db:down
   ```

### Option 3: Full Docker Stack

1. **Build and run everything:**

   ```bash
   npm run docker:build
   npm run docker:up
   ```

2. **View logs:**

   ```bash
   npm run docker:logs
   ```

3. **Stop everything:**
   ```bash
   npm run docker:down
   ```

## API Endpoints

### Developers

- `GET /api/developers` - Get all developers
- `GET /api/developers/:id` - Get developer by ID
- `POST /api/developers` - Create new developer
- `PUT /api/developers/:id` - Update developer
- `DELETE /api/developers/:id` - Delete developer

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── entities/        # TypeORM entities
├── routes/          # Express routes
├── services/        # Business logic
└── index.ts         # Main application file
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
