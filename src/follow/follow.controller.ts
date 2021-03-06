import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { AccessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { FollowService } from './follow.service';

@UseGuards(AccessTokenGuard)
@Controller()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Patch('follow/:following_id')
  public async follow(
    @Param('following_id', ParseIntPipe) followingId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.followService.followUser(+userId, followingId);
  }

  @Patch('unfollow/:following_id')
  public async unfollow(
    @Param('following_id', ParseIntPipe) followingId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.followService.unfollowUser(+userId, followingId);
  }

  @Get('followers/:user_id')
  public async followers(@Param('user_id', ParseIntPipe) userId: number) {
    return await this.followService.findFollowers(userId);
  }

  @Get('following/:user_id')
  public async following(@Param('user_id', ParseIntPipe) userId: number) {
    return await this.followService.findFollowing(userId);
  }
}
