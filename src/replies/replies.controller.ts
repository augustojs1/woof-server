import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
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
    return this.repliesService.create(createReplyDto, postId, userId);
  }

  @Get()
  public async findAll() {
    return this.repliesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.repliesService.findOne(+id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.repliesService.remove(+id);
  }
}
