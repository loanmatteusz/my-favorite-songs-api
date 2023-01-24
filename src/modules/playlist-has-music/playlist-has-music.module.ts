import { Module } from '@nestjs/common';
import { PlaylistHasMusicService } from './playlist-has-music.service';
import { PlaylistHasMusicController } from './playlist-has-music.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PlaylistHasMusicController],
  providers: [PlaylistHasMusicService, PrismaService]
})
export class PlaylistHasMusicModule {}
