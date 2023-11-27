import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string,
  ) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.name = name;
    this.description = description;
    this.daily_rate = daily_rate;
    this.license_plate = license_plate;
    this.fine_amount = fine_amount;
    this.brand = brand;
    this.category_id = category_id;
    this.available = true;
    this.created_at = new Date();
  }
}

export { Car };
