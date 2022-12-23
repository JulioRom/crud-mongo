import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  @IsNotEmpty()
  rut: number;
}
