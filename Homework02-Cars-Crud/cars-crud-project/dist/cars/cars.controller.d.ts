import { CarsService } from "./cars.service";
import { CreateCarsDto } from "./dtos/create-cars.dto";
import { UpdateCarsDto } from "./dtos/update-cars.dto";
import { Response } from "express";
export declare class CarsController {
    private carsService;
    constructor(carsService: CarsService);
    getAllCars(): Promise<import("./interfaces/cars.interface").Cars[]>;
    getCarById(carId: string): Promise<import("./interfaces/cars.interface").Cars>;
    createCar(body: CreateCarsDto): Promise<import("./interfaces/cars.interface").Cars>;
    updateCar(carId: string, updateData: UpdateCarsDto): Promise<void>;
    deleteCar(res: Response, carId: string): Promise<void>;
}
