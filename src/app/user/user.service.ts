import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashSync(createUserDto.password, 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    delete user.password;
    await this.prisma.playlist.create({
      data: {
        title: 'Favorite',
        description: 'Favorite musics for this user',
        userId: user.id,
      },
    });
    return user;
  }


  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      select: {
        name: true,
        lastname: true,
        email: true,
        playlist: {
          select: {
            title: true,
            description: true,
            musics: true,
          }
        },
        created_at: true,
        updated_at: true,
      },
      where: {
        id,
      },
    });
    return user;
  }


  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        playlist: {
          select: {
            title: true,
            description: true,
            musics: true,
          }
        },
        created_at: true,
        updated_at: true,
      },
    });
    return users;
  }


  async update(id: string, updateDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      data: {
        ...updateDto,
        updated_at: new Date(),
      },
      where: {
        id,
      },
      select: {
        name: true,
        lastname: true,
        email: true,
        playlist: {
          select: {
            title: true,
            description: true,
            musics: true,
          },
        },
        created_at: true,
        updated_at: true,
      }
    });
    return user;
  }


  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return `#${id} user has been deleted`;
  }
}
