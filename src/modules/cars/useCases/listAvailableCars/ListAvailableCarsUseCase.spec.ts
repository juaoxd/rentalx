import "reflect-metadata";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Desc",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Test Brand",
      category_id: "Test Id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Desc",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "Test Id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car Name",
      description: "Test Desc",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "Test Id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Test Car Name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car Name",
      description: "Test Desc",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
