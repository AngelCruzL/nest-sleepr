import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { JwtAuthGuard } from '../guards';
import { CurrentUser } from '@app/common';
import { UserDocument } from './models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
