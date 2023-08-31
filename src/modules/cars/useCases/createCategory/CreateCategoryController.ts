import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      this.createCategoryUseCase.execute({ name, description });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(201).json();
  }
}

export { CreateCategoryController };
