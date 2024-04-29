import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly user_repo: typeof User) {}
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.user_repo.findOne({ where: { email } });
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    dto.password = await this.hashPassword(dto.password);
    await this.user_repo.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }
}
