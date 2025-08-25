// import * as dotenv from "dotenv";
// dotenv.config(); // 👈 this must be BEFORE using process.env

// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { Developer } from "../entities/Developer";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: parseInt(process.env.DB_PORT || "5432"),
//   username: process.env.DB_USERNAME || "postgres",
//   password: process.env.DB_PASSWORD || "password",
//   // database: process.env.DB_DATABASE || "devs_repo",
//   database: process.env.DATABASE_URL,
//   // synchronize: process.env.NODE_ENV === "development", // Auto-sync in development
//   synchronize: false,
//   logging: process.env.NODE_ENV === "development",
//   entities: [Developer],
//   migrations: ["src/migrations/*.ts"],
//   subscribers: [],
// });

import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Developer } from "../entities/Developer";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // 👈 use this instead of host/port/username/password
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [Developer],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  ssl:
    process.env.NODE_ENV !== "development"
      ? { rejectUnauthorized: false }
      : false, // 👈 required for Neon/Render
});
