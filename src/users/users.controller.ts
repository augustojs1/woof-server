import { Controller, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/authentication/guards/access-token.guard';
import { UsersService } from './users.service';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
