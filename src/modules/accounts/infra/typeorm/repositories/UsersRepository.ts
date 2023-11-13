import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { Repository } from "typeorm";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

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
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicense,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  findById(id: string): Promise<User> {
    const user = this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
