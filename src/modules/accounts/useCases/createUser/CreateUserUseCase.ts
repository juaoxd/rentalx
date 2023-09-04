import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driverLicense,
  }: ICreateUsersDTO): Promise<void> {
    try {
      await this.usersRepository.create({
        name,
        username,
        email,
        password,
        driverLicense,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export { CreateUserUseCase };
