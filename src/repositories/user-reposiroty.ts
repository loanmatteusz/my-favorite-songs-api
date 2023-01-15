import { User } from "@prisma/client";
import { hashSync } from "bcrypt";
import { CreateUserDto } from "src/app/user/dto/create-user.dto";
import { UpdateUserDto } from "src/app/user/dto/update-user.dto";
import { PrismaService } from "src/infra/prisma.service";
import { RepositoryContract } from "./repository-contract";

export class UserRepository implements RepositoryContract<User, CreateUserDto, UpdateUserDto> {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
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


  async find(id: string): Promise<Partial<User>> {
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


  async findAll(): Promise<Partial<User>[]> {
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


  async update(id: string, updateDto: UpdateUserDto): Promise<Partial<User>> {
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


  async delete(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return `#${id} user has been deleted`;
  }
}
