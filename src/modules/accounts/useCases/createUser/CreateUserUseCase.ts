import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcrypt";

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
    const passwordHash = await hash(password, 8);

    try {
      await this.usersRepository.create({
        name,
        email,
        password: passwordHash,
        driverLicense,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export { CreateUserUseCase };
