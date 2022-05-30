import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/providers/jwt-auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  async me(@CurrentUser() user) {
    return await this.usersService.getPublicKey(user);
  }
}
