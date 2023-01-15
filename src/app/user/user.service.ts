import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { UserRepository } from 'src/repositories/user-reposiroty';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return user;
  }


  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }


  async findOne(id: string) {
    const user = await this.userRepository.find(id);
    return user;
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.update(id, updateUserDto);
    return user;
  }

  
  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
