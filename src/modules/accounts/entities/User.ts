import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driverLicense: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    driverLicense: string,
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.driverLicense = driverLicense;
    this.isAdmin = false;
    this.created_at = new Date();
  }
}

export { User };
