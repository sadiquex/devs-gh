import { DataSource } from "typeorm";
import { Developer } from "../entities/Developer";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "devs_repo",
  synchronize: process.env.NODE_ENV === "development", // Auto-sync in development
  logging: process.env.NODE_ENV === "development",
  entities: [Developer],
  migrations: [],
  subscribers: [],
});
