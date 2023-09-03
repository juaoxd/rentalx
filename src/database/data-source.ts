import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "rentalx",
  synchronize: true,
  logging: true,
  entities: [Category, Specification],
  subscribers: [],
  migrations: [__dirname + "/migrations/*.ts"],
});
