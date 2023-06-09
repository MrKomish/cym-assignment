import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginRequestDto } from './login-request.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './login-response.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() reqDto: LoginRequestDto,
    @Req() req: Request,
  ): Promise<LoginResponseDto> {
    const userAgent = req.get('user-agent');
    if (userAgent == null) {
      throw new BadRequestException('The user agent header is required');
    }

    const accessToken = await this.authService.login(
      reqDto.username,
      reqDto.password
    );

    if (accessToken == null) {
      throw new UnauthorizedException();
    }

    return { accessToken };
  }
}
