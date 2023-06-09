import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from './global-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = await app.resolve(ConfigService<GlobalConfig>);
  const port = configService.get('PORT', { infer: true });

  await app.listen(port!);
}
bootstrap();
