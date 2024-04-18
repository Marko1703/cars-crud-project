import { Injectable, NotFoundException } from '@nestjs/common';
import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Cars } from "./interfaces/cars.interface";
import { CreateCarsDto } from "./dtos/create-cars.dto";
import { v4 as uuid } from "uuid";
import { UpdateCarsDto } from "./dtos/update-cars.dto";

@Injectable()
export class CarsService {
    async getAllCars() {
        const carsJSON = await readFile(
          join(process.cwd(), "src", "cars", "data", "cars.json"),
          "utf-8"
        );
    
        const cars: Cars[] = JSON.parse(carsJSON);
    
        return cars;
      }
    
      async saveCars(cars: Cars[]) {
        await writeFile(
          join(process.cwd(), "src", "cars", "data", "cars.json"),
          JSON.stringify(cars, null, 2),
          "utf-8"
        );
      }
    
      async getCarById(carId: string) {
        const cars = await this.getAllCars();
    
        const foundCars = cars.find(car => car.id === carId);
    
        if (!foundCars) throw new NotFoundException("Cars not found");
    
        return foundCars;
      }
    
      async createCar(carData: CreateCarsDto) {
        const cars = await this.getAllCars();
    
        const newCar: Cars = {
          id: uuid(),
          ...carData,
        };
    
        cars.push(newCar);
    
        await this.saveCars(cars);
    
        return newCar;
      }
    
      async updateCar(carId: string, updateData: UpdateCarsDto) {
        const cars = await this.getAllCars();
    
        const carExists = cars.some(car => car.id === carId);
    
        if (!carExists) throw new NotFoundException("Car not found");
    
        const updatedCar = cars.map(car => {
          if (car.id === carId) {
            return { ...car, ...updateData };
          } else {
            return car;
          }
        });
    
        await this.saveCars(updatedCar);
      }
    
      async deleteCar(carId: string) {
        const cars = await this.getAllCars();
    
        const updatedCars = cars.filter(
          car => car.id !== carId
        );
    
        if (cars.length === updatedCars.length)
          throw new NotFoundException("Cars not found");
    
        await this.saveCars(updatedCars);
      }
}
