import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { WatchList } from '../watchlist/models/watchlist.model';
import { SecurityService } from '../security/security.service';
import { AuthUserResponse } from '../auth/response';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly user_repo: typeof User,
    private readonly securityService: SecurityService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.user_repo.findOne({
        where: { email },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return this.user_repo.findOne({
        where: { id },
        include: {
          model: WatchList,
          required: false,
        },
      });
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

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.user_repo.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchList,
          required: false,
        },
      });
      const token = await this.securityService.generateJwtToken(user);
      return { user, token };
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

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.user_repo.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePassword(userId: number, dto: UpdatePasswordDto): Promise<any> {
    try {
      const { password } = await this.findUserById(userId);
      const currentPassword = await bcrypt.compare(dto.oldPassword, password);
      if (!currentPassword) return new BadRequestException(AppError.WRONG_DATA);
      const newPassword = await this.hashPassword(dto.newPassword);
      const data = {
        password: newPassword,
      };
      return this.user_repo.update(data, { where: { id: userId } });
    } catch (error) {
      throw new Error(error);
    }
  }
}
