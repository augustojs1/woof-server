import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AccessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { GetCurrentUser } from 'src/authentication/decorators/current-user.decorator';

@UseGuards(AccessTokenGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public async create(
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUser() userId: number,
  ) {
    return await this.postsService.create(createPostDto, userId);
  }

  @Get()
  public async findAll(@GetCurrentUser() userId: number) {
    return await this.postsService.findAll(+userId);
  }

  @Get(':id')
  public async findOne(@Param('id') postId: string) {
    return await this.postsService.findOne(+postId);
  }

  @Patch('like/:id')
  public async like(
    @Param('id') postId: string,
    @GetCurrentUser() userId: number,
  ) {
    return await this.postsService.likeAPost(+postId, userId);
  }

  @Delete(':id')
  public async delete(
    @Param('id') postId: string,
    @GetCurrentUser() userId: number,
  ) {
    return this.postsService.deletePost(+postId, userId);
  }
}
