import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class RepliesService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    createReplyDto: CreateReplyDto,
    postId: number,
    userId: number,
  ) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new HttpException(
        'Post with this id does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newReply = await this.prisma.reply.create({
      data: {
        content: createReplyDto.content,
        user_id: userId,
        post_id: postId,
      },
    });

    return newReply;
  }

  public async likeReply(replyId: number, userId: number) {
    const post = await this.prisma.reply.findUnique({
      where: {
        id: replyId,
      },
    });

    if (!post) {
      throw new HttpException(
        'Reply with this Id does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const replyAlreadyLiked = await this.prisma.likedReply.findFirst({
      where: {
        reply_id: replyId,
        user_id: userId,
      },
    });

    if (replyAlreadyLiked) {
      return;
    }

    await this.prisma.likedReply.create({
      data: {
        reply_id: replyId,
        user_id: userId,
      },
    });

    return await this.prisma.reply.update({
      where: {
        id: replyId,
      },
      data: {
        likes: post.likes + 1,
      },
    });
  }

  public async dislikeReply(replyId: number, userId: number) {
    const reply = await this.prisma.reply.findUnique({
      where: {
        id: replyId,
      },
    });

    if (!reply) {
      throw new HttpException(
        'Reply with this Id does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const replyAlreadyLiked = await this.prisma.likedReply.findFirst({
      where: {
        reply_id: replyId,
        user_id: userId,
      },
    });

    if (!replyAlreadyLiked) {
      throw new HttpException(
        'You have not liked the post with this id!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.likedReply.deleteMany({
      where: {
        reply_id: replyAlreadyLiked.reply_id,
        user_id: replyAlreadyLiked.user_id,
      },
    });

    return await this.prisma.reply.updateMany({
      where: {
        id: replyId,
      },
      data: {
        likes: reply.likes - 1,
      },
    });
  }

  public async findRepliesFromPost(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new HttpException(
        'Post with this id does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const replies = await this.prisma.reply.findMany({
      where: {
        post_id: postId,
      },
    });

    return replies;
  }

  public async remove(userId: number, replyId: number) {
    const reply = await this.prisma.reply.findUnique({
      where: {
        id: replyId,
      },
    });

    if (!reply) {
      throw new HttpException(
        'Reply with this id does not exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isUserReply = reply.user_id === userId ? true : false;

    if (!isUserReply) {
      throw new HttpException(
        'You do not have permission to delete this reply!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.reply.delete({
      where: {
        id: replyId,
      },
    });
  }
}
