import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
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
  public async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
