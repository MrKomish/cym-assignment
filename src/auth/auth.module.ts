import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';
import { GlobalConfig } from '../global-config.interface';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtModuleOptionsFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

function jwtModuleOptionsFactory(
  configService: ConfigService<GlobalConfig>,
): JwtModuleOptions {
  const jwtSecret = configService.get('JWT_SECRET', { infer: true });
  const loginTimeout = configService.get('LOGIN_TIMEOUT', {
    infer: true,
  });

  return {
    global: true,
    secret: jwtSecret,
    signOptions: { expiresIn: loginTimeout },
  };
}
