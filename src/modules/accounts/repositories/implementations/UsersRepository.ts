import { IUsersRepository } from "../IUsersRepository";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { AppDataSource } from "../../../../database/data-source";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }
}

export { UsersRepository };
