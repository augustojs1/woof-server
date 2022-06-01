import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

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

  public async findAll() {
    const posts = await this.prisma.post.findMany({
      select: {
        user: true,
        content: true,
        id: true,
        likes: true,
        createdAt: true,
        media_url: true,
        public: true,
        shares: true,
      },
    });

    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
