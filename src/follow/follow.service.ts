import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  public async followUser(userId: number, followingId: number) {
    if (userId === followingId) {
      throw new HttpException(
        'User can not follow themselves!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const followingUser = await this.prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    const followerUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!followingUser) {
      throw new HttpException(
        'User to follow does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const alreadyFollows = await this.prisma.userFollow.findFirst({
      where: {
        followerId: userId,
        followingId: followingId,
      },
    });

    if (alreadyFollows) {
      throw new HttpException(
        'You already follow this user',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: {
        id: followingUser.id,
      },
      data: {
        followers_ammount: followingUser.followers_ammount + 1,
      },
    });

    await this.prisma.user.update({
      where: {
        id: followerUser.id,
      },
      data: {
        following_ammount: followerUser.following_ammount + 1,
      },
    });

    return await this.prisma.userFollow.create({
      data: {
        followerId: userId,
        followingId: followingUser.id,
      },
    });
  }
}
