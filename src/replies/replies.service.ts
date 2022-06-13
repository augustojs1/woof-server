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

  public async likeReply() {
    return `This action returns all replies`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} reply`;
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
