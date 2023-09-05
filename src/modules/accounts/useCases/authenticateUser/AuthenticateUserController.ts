import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { container } from "tsyringe";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase,
      );
      const token = await authenticateUserUseCase.execute({ password, email });
      return response.json(token);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { AuthenticateUserController };
