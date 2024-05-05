import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// ========== config ==========
import app_config from './config/app.config';
import db_config from './config/database.config';
import { User } from './app/user/models/user.model';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { SecurityModule } from './app/security/security.module';
import { WatchlistModule } from './app/watchlist/watchlist.module';
import { WatchList } from './app/watchlist/models/watchlist.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app_config, db_config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('dbHost'),
        port: config.get('dbPort'),
        username: config.get('dbUser'),
        password: config.get('dbPassword'),
        database: config.get('dbName'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, WatchList],
      }),
    }),
    UserModule,
    AuthModule,
    SecurityModule,
    WatchlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
