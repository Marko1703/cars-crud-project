"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const uuid_1 = require("uuid");
let CarsService = class CarsService {
    async getAllCars() {
        const carsJSON = await (0, promises_1.readFile)((0, node_path_1.join)(process.cwd(), "src", "cars", "data", "cars.json"), "utf-8");
        const cars = JSON.parse(carsJSON);
        return cars;
    }
    async saveCars(cars) {
        await (0, promises_1.writeFile)((0, node_path_1.join)(process.cwd(), "src", "cars", "data", "cars.json"), JSON.stringify(cars, null, 2), "utf-8");
    }
    async getCarById(carId) {
        const cars = await this.getAllCars();
        const foundCars = cars.find(car => car.id === carId);
        if (!foundCars)
            throw new common_1.NotFoundException("Cars not found");
        return foundCars;
    }
    async createCar(carData) {
        const cars = await this.getAllCars();
        const newCar = {
            id: (0, uuid_1.v4)(),
            ...carData,
        };
        cars.push(newCar);
        await this.saveCars(cars);
        return newCar;
    }
    async updateCar(carId, updateData) {
        const cars = await this.getAllCars();
        const carExists = cars.some(car => car.id === carId);
        if (!carExists)
            throw new common_1.NotFoundException("Car not found");
        const updatedCar = cars.map(car => {
            if (car.id === carId) {
                return { ...car, ...updateData };
            }
            else {
                return car;
            }
        });
        await this.saveCars(updatedCar);
    }
    async deleteCar(carId) {
        const cars = await this.getAllCars();
        const updatedCars = cars.filter(car => car.id !== carId);
        if (cars.length === updatedCars.length)
            throw new common_1.NotFoundException("Cars not found");
        await this.saveCars(updatedCars);
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)()
], CarsService);
//# sourceMappingURL=cars.service.js.map