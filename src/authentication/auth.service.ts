import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CustomError } from '../errors/custom.errors';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { BcryptAdapter } from './bcrypt';
import { JwtAdapter } from './jwt';

export class AuthService {
  constructor(public readonly userRepository: Repository<UserEntity>) {}

  async signup(userData: CreateUserDto): Promise<string> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new CustomError(400, 'User with this email already exists');
    }

    const hashedPassword = BcryptAdapter.hash(userData.password);

    const newUser = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      username: userData.email,
    });

    await this.userRepository.save(newUser);

    const token = await JwtAdapter.generateToken({ id: newUser.id });

    return token!;
  }

  async signin(credentials: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user || !BcryptAdapter.compare(credentials.password, user.password)) {
      throw new CustomError(401, 'Invalid email or password');
    }

    const token = await JwtAdapter.generateToken({ id: user.id });

    return token!;
  }
}
