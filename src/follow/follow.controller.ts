import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { AccessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { FollowService } from './follow.service';

@UseGuards(AccessTokenGuard)
@Controller()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Patch('follow/:following_id')
  public async follow(
    @Param('following_id') followingId: number,
    @GetCurrentUser() userId: number,
  ) {
    return await this.followService.followUser(+userId, +followingId);
  }
}
