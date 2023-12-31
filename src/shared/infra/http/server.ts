import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import swaggerFile from "swagger.json";
import "@shared/infra/typeorm/data-source";
import "@shared/container";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { AppError } from "@errors/AppError";

const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized"))
  .catch((err) => console.error(`Data Source initialization error`, err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log("Server is running"));
