import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SecurityService, JwtService],
  exports: [SecurityService],
})
export class SecurityModule {}
