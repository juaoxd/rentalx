import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authentcateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authentcateUserController.handle);

export { authenticateRoutes };
