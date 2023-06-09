import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GlobalConfig, globalConfigSchema } from './global-config.interface';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: globalConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseOptionsFactory,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    FeedModule
  ],
})
export class AppModule {}

function mongooseOptionsFactory(
  config: ConfigService<GlobalConfig>,
): MongooseModuleOptions {
  const host = config.get('MONGODB_CONNECTION_STRING', { infer: true });

  return {
    uri: host
  };
}
