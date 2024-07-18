import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserSignInForm } from './dto/user-sign-in';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('sign-up')
  register(@Body() dto: UserDto): Promise<AuthUserResponse> {
    console.log(dto);
    return this.authService.registerUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('sign-in')
  signIn(
    @Body() dto: UserSignInForm,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtPermissionsGuard)
  @Get('get-public-user-data')
  getPublicUserData(@Req() request) {
    const user = request.user;
    return this.userService.publicUser(user.email);
  }
}
