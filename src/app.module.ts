import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.required(),
        ACCESS_TOKEN_SECRET: Joi.required(),
        REFRESH_TOKEN_SECRET: Joi.required(),
      }),
    }),
    AuthModule,
    PrismaModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
