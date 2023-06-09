import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlphanumeric,
  IsEmail,
} from 'class-validator';
import { CreateUser } from './create-user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
}

export function toCreateUser(dto: CreateUserDto): CreateUser {
  return {
    email: dto.email,
    username: dto.username,
    password: dto.password
  };
}