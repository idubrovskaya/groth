import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { AppError } from 'src/common/constants/errors';
import { WatchList } from '../watchlist/models/watchlist.model';

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
    dto.password = await this.hashPassword(dto.password);
    await this.user_repo.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }

  async publicUser(email: string) {
    return this.user_repo.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
      include: {
        model: WatchList,
        required: false,
      },
    });
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.user_repo.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.user_repo.destroy({ where: { email } });
    return true;
  }
}
