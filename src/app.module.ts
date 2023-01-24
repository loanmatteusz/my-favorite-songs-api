import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { MusicModule } from './modules/music/music.module';
import { LinkModule } from './modules/link/link.module';
import { PlaylistHasMusicModule } from './modules/playlist-has-music/playlist-has-music.module';

@Module({
  imports: [
    UserModule,
    PlaylistModule,
    MusicModule,
    LinkModule,
    PlaylistHasMusicModule
  ],
})
export class AppModule { }
