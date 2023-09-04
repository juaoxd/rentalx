import express from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database/data-source";
import "./shared/container";
import { AppDataSource } from "./database/data-source";

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized"))
  .catch((err) => console.error(`Data Source initialization error`, err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running"));
