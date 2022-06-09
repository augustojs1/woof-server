import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createPostDto: CreatePostDto, userId: number) {
    const newPost = await this.prisma.post.create({
      data: {
        content: createPostDto.content,
        user_id: userId,
        public: createPostDto.public ? createPostDto.public : true,
      },
    });

    return newPost;
  }

  public async findAll(userId: number) {
    const posts = await this.prisma.$queryRaw(
      Prisma.sql`SELECT * 
                FROM posts
                WHERE user_id IN 
                (SELECT following_id FROM users_follows WHERE follower_id = ${userId}) 
                OR user_id = ${userId} 
                ORDER BY created_at DESC;`,
    );

    return posts;
  }

  public async findOne(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        user: true,
        content: true,
        id: true,
        likes: true,
        created_at: true,
        media_url: true,
        public: true,
        shares: true,
      },
    });

    if (!post) {
      throw new HttpException('Post does not exists!', HttpStatus.BAD_REQUEST);
    }

    return post;
  }

  public async likeAPost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new HttpException('Post does not exists!', HttpStatus.BAD_REQUEST);
    }

    const postAlreadyLiked = await this.prisma.likedPost.findFirst({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    if (postAlreadyLiked) {
      return;
    }

    await this.prisma.likedPost.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });

    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: post.likes + 1,
      },
    });
  }

  public async deletePost(postId: number, userId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
        user_id: userId,
      },
    });

    if (!post) {
      throw new HttpException(
        'Post does not exists or user does not have permission to delete!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
