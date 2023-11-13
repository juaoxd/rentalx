import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driverLicense: string;

  @Column()
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    driverLicense: string,
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.name = name;
    this.email = email;
    this.password = password;
    this.driverLicense = driverLicense;
    this.isAdmin = false;
    this.created_at = new Date();
  }
}

export { User };
