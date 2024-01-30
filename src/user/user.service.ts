import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CustomError } from '../errors/custom.errors';

export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {}

  async createUser(userDto: CreateUserDto) {
    const user = new UserEntity();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    user.userName = userDto.email;

    const userExist = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (userExist) {
      throw new CustomError(400, 'User exist');
    }

    await this.userRepository.save(user);

    return user;
  }
}
