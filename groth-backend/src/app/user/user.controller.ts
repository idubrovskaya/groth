import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createNewUsers(@Body() dto: UserDto) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
}
