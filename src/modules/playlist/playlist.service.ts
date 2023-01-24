import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Music } from '../music/entities/music.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) { }

  async create(createPlaylistDto: CreatePlaylistDto, userId: string) {
    const playlist = await this.prisma.playlist.create({
      data: {
        title: createPlaylistDto.title,
        description: createPlaylistDto.description,
        userId,
      },
    });
    return playlist;
  }


  async findAll() {
    const allPlaylist = await this.prisma.playlist.findMany({
      include: {
        musics: {
          select: {
            music: {
              select: {
                id: true,
                name: true,
                author: true,
                links: {
                  select: {
                    link: true,
                  }
                }
              }
            }
          }
        },
      }
    });
    return allPlaylist;
  }


  async findOne(id: string) {
    const playlist = await this.prisma.playlist.findFirst({
      where: {
        id,
      },
      include: {
        musics: true,
      }
    });
    return playlist;
  }


  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.prisma.playlist.update({
      data: {
        ...updatePlaylistDto,
        updated_at: new Date(),
      },
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
      }
    });
    return playlist;
  }


  async remove(id: string) {
    await this.prisma.playlist.delete({
      where: {
        id,
      },
    });
    return `#${id} playlist has been deleted`;
  }
}
