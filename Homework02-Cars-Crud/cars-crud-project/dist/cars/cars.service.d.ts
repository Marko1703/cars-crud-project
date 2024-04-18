import { Cars } from "./interfaces/cars.interface";
import { CreateCarsDto } from "./dtos/create-cars.dto";
import { UpdateCarsDto } from "./dtos/update-cars.dto";
export declare class CarsService {
    getAllCars(): Promise<Cars[]>;
    saveCars(cars: Cars[]): Promise<void>;
    getCarById(carId: string): Promise<Cars>;
    createCar(carData: CreateCarsDto): Promise<Cars>;
    updateCar(carId: string, updateData: UpdateCarsDto): Promise<void>;
    deleteCar(carId: string): Promise<void>;
}
