import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.entity';
import { CreateUser } from './create-user.interface';
import { PasswordService } from './password.service';

export class UsernameTakenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsernameTakenError";
  }
}
export class EmailTakenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailTakenError";
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUser: CreateUser): Promise<User> {
    if (await this.userModel.exists({ username: createUser.username}).exec()) {
      throw new UsernameTakenError('Username already taken');
    }
    if (await this.userModel.exists({ email: createUser.email }).exec()) {
      throw new UsernameTakenError('Email already taken');
    }

    const user = new this.userModel({
      username: createUser.username,
      password: await this.passwordService.hash(createUser.password)
    });
    await user.save();

    return user;
  }

  async get(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }
}
