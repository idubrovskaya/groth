import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserSignInForm } from './dto/user-sign-in';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  signIn(@Body() dto: UserSignInForm): Promise<AuthUserResponse> {
    return this.authService.signIn(dto);
  }
}
