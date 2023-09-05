import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("E-mail already registered!");
    }

    const passwordHash = await hash(password, 8);

    try {
      await this.usersRepository.create({
        name,
        email,
        password: passwordHash,
        driverLicense,
      });
    } catch (err) {
      throw new AppError("User registration failed");
    }
  }
}

export { CreateUserUseCase };
