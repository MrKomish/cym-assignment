import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../users/password.service';
import { LoggedInUser } from './logged-in-user.interface';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../global-config.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) {}

  async login(
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await this.usersService.findOne(username);
    if (user == null) {
      return null;
    }

    const isPasswordCorrect = await this.passwordService.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return null;
    }

    const loggedInUser: LoggedInUser = {
      id: user._id.toString(),
    };
    const accessToken = await this.jwtService.signAsync(loggedInUser);

    return accessToken;
  }
}
