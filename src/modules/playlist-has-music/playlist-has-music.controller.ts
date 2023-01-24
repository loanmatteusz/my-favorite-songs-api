import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistHasMusicService } from './playlist-has-music.service';
import { CreatePlaylistHasMusicDto } from './dto/create-playlist-has-music.dto';
import { UpdatePlaylistHasMusicDto } from './dto/update-playlist-has-music.dto';

@Controller('playlist-has-music')
export class PlaylistHasMusicController {
  constructor(private readonly playlistHasMusicService: PlaylistHasMusicService) {}

  @Post()
  create(@Body() createPlaylistHasMusicDto: CreatePlaylistHasMusicDto) {
    return this.playlistHasMusicService.create(createPlaylistHasMusicDto);
  }

  @Get()
  findAll() {
    return this.playlistHasMusicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistHasMusicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistHasMusicDto: UpdatePlaylistHasMusicDto) {
    return this.playlistHasMusicService.update(+id, updatePlaylistHasMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistHasMusicService.remove(+id);
  }
}
