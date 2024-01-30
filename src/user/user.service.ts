import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {}

  async createUser(userDto: CreateUserDto) {
    // Crear una nueva instancia de UserEntity a partir de los datos del DTO
    const user = new UserEntity();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    user.userName = userDto.email;

    await this.userRepository.save(user);

    return user;
  }
}
