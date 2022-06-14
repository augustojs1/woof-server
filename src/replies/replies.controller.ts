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
    return await this.repliesService.create(createReplyDto, postId, userId);
  }

  @Patch('like/:id')
  public async like(
    @Param('id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.repliesService.likeReply(replyId, userId);
  }

  @Patch('dislike/:id')
  public async dislike(
    @Param('id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.repliesService.dislikeReply(replyId, userId);
  }

  @Get('like/:id')
  public async findLike(
    @Param('id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.repliesService.checkLike(replyId, userId);
  }

  @Get('post/:post_id')
  public async findOne(@Param('post_id', ParseIntPipe) postId: number) {
    return await this.repliesService.findRepliesFromPost(postId);
  }

  @Delete(':reply_id')
  public async remove(
    @Param('reply_id', ParseIntPipe) replyId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.repliesService.remove(+userId, replyId);
  }
}
