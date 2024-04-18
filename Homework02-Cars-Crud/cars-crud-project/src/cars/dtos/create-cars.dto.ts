import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateCarsDto {
  @IsString()
  @Length(3, 30)
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;
}