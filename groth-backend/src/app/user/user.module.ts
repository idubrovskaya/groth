import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { WatchList } from '../watchlist/models/watchlist.model';
import { SecurityModule } from '../security/security.module';

@Module({
  imports: [SequelizeModule.forFeature([User, WatchList]), SecurityModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
