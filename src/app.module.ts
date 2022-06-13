import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { FollowModule } from './follow/follow.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.required(),
        DATABASE_URL: Joi.required(),
        ACCESS_TOKEN_SECRET: Joi.required(),
        REFRESH_TOKEN_SECRET: Joi.required(),
      }),
    }),
    AuthModule,
    PrismaModule,
    PostsModule,
    UsersModule,
    FollowModule,
    RepliesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
