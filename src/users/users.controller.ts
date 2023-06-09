import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { UserDto, toUserDto } from './user.dto';
import { CreateUserDto, toCreateUser } from './create-user.dto';
import { EmailTakenError, UsernameTakenError, UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.usersService.create(
        toCreateUser(createDto)
      );

      return toUserDto(user);
    } catch (err: any) {
      if (err instanceof EmailTakenError) {
        throw new BadRequestException({
          statusCode: 400,
          message: err.message,
          reason: 'email_taken',
        });
      }
      if (err instanceof UsernameTakenError) {
        throw new BadRequestException({
          statusCode: 400,
          message: err.message,
          reason: 'username_taken',
        });
      }
      throw err;
    }
  }

  @Get("[:userId]")
  async get(
    @Param('userId') userId: string, // TODO turn to dto with validator for userId (should be mongodb id)
  ): Promise<UserDto> {
    const user = await this.usersService.get(userId);
    if (user == null) {
      throw new NotFoundException("User not found");
    }
    return toUserDto(user);
  }
}
