# Devs-Repo Backend

A Node.js + TypeScript + Express backend API for the Developers Repository project.

## Features

- TypeScript support
- Express.js framework
- PostgreSQL database with TypeORM
- RESTful API endpoints
- Developer management (CRUD operations)

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

<!-- TODO:  -->

- Accept profile photo - upload to cloudinary and send the url to the backend
