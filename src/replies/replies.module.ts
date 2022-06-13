import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService]
})
export class RepliesModule {}
