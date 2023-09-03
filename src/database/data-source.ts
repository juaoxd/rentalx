import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "rentalx",
  synchronize: true,
  logging: true,
  entities: [Category],
  subscribers: [],
  migrations: [__dirname + "/migrations/*.ts"],
});
