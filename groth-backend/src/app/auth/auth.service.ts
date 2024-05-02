import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { AppError } from 'src/common/constants/errors';
import { UserSignInForm } from './dto/user-sign-in';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
  ) {}

  async registerUser(dto: UserDto): Promise<UserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async signIn(dto: UserSignInForm): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!validatePassword) {
      throw new BadRequestException({ message: AppError.WRONG_DATA });
    }

    const userData = {
      name: existUser.firstName,
      email: existUser.email,
    };
    const token = await this.securityService.generateJwtToken(userData);

    const user = await this.userService.publicUser(dto.email);

    return { ...user, token };
  }
}
