import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    const link = await this.prisma.link.create({
      data: {
        link: createLinkDto.link,
        musicId: createLinkDto.musicId,
      }
    });
    return link;
  }

  findAll() {
    return `This action returns all link`;
  }

  findOne(id: string) {
    return `This action returns a #${id} link`;
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: string) {
    return `This action removes a #${id} link`;
  }
}
