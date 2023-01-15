import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/prisma.service';
import { UserRepository } from 'src/repositories/user-reposiroty';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository]
})
export class UserModule {}
