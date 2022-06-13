import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { AccessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { GetCurrentUser } from 'src/authentication/decorators/current-user.decorator';

@UseGuards(AccessTokenGuard)
@Controller('reply')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post(':id')
  public async create(
    @GetCurrentUser() userId: number,
    @Body() createReplyDto: CreateReplyDto,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.repliesService.create(createReplyDto, postId, userId);
  }

  @Patch('like/:id')
  public async like(
    @Param('id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return this.repliesService.likeReply(replyId, userId);
  }

  @Get('post/:post_id')
  public async findOne(@Param('post_id', ParseIntPipe) postId: number) {
    return this.repliesService.findRepliesFromPost(postId);
  }

  @Delete(':reply_id')
  public async remove(
    @Param('reply_id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return this.repliesService.remove(+userId, replyId);
  }
}
