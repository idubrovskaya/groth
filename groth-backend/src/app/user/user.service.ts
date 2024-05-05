import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { WatchList } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly user_repo: typeof User) {}
  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.user_repo.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.user_repo.create({
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.user_repo.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.user_repo.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.user_repo.destroy({ where: { email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
