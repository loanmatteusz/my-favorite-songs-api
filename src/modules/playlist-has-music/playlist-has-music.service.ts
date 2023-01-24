import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePlaylistHasMusicDto } from './dto/create-playlist-has-music.dto';
import { UpdatePlaylistHasMusicDto } from './dto/update-playlist-has-music.dto';

@Injectable()
export class PlaylistHasMusicService {
  constructor(private prisma: PrismaService) {}

  async create(createPlaylistHasMusicDto: CreatePlaylistHasMusicDto) {
    const playlistHasMusicRelation = await this.prisma.playlistHasMusic.create({
      data: {
        playlistId: createPlaylistHasMusicDto.playlistId,
        musicId: createPlaylistHasMusicDto.musicId,
        assigned_by: createPlaylistHasMusicDto.assigned_by,
      },
    });
    return playlistHasMusicRelation;
  }

  async findAll() {
    const playlistHasMusicRelation = await this.prisma.playlistHasMusic.findMany();
    return playlistHasMusicRelation;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistHasMusic`;
  }

  update(id: number, updatePlaylistHasMusicDto: UpdatePlaylistHasMusicDto) {
    return `This action updates a #${id} playlistHasMusic`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistHasMusic`;
  }
}
