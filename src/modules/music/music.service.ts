import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private prisma: PrismaService) {}

  async create(createMusicDto: CreateMusicDto) {
    const music = await this.prisma.music.create({
      data: {
        name: createMusicDto.name,
        author: createMusicDto.author, // Poderia ser uma entidade :)
      },
    });
    return music;
  }

  async findAll() {
    const musics = await this.prisma.music.findMany({
      select: {
        id: true,
        name: true,
        author: true,
        links: {
          select: {
            id: true,
            link: true,
          }
        },
      }
    });
    return musics;
  }

  async findOne(id: string) {
    const music = await this.prisma.music.findFirst({
      where: {
        id,
      },
      include: {
        links: {
          select: {
            id: true,
            link: true,
          }
        },
      }
    });
    return music;
  }

  async update(id: string, updateMusicDto: UpdateMusicDto) {
    const updatedMusic = await this.prisma.music.update({
      data: updateMusicDto,
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        author: true,
        playlists: {
          select: {
            playlistId: true,
          }
        },
      }
    });
    return updatedMusic;
  }

  async remove(id: string) {
    await this.prisma.music.delete({
      where: {
        id,
      }
    });
    return `This action removes a #${id} music`;
  }
}
