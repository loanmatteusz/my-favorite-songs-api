import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService, PrismaService]
})
export class MusicModule {}
