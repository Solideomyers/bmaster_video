import JWT from 'jsonwebtoken';
import { envs } from '../config/envs';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CustomError } from '../errors/custom.errors';
import { CreateUserDto } from '../user/dtos/create-user.dto';

export class AuthService {
  private secretKey: string;

  constructor(public readonly userRepository: Repository<UserEntity>) {
    this.secretKey = envs.JWT_SECRET || 'secret';
  }

  async signup(userData: CreateUserDto): Promise<string> {
    const newUser = await this.createUser(userData);

    const token = this.generateToken(newUser);
    return token;
  }

  async signin(token: string): Promise<any> {
    const decodedToken = this.validateToken(token);

    const user = await this.userRepository.findOne(decodedToken.id);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    return user;
  }

  private async createUser(userData: CreateUserDto): Promise<any> {
    const newUser = await this.userRepository.create(userData);

    const userExist = await this.userRepository.findOne({
      where: { email: userData.email, name: userData.name },
    });

    if (userExist?.email && userExist.name) {
      throw new CustomError(404, 'User already exist');
    }

    await this.userRepository.save(newUser);
    return newUser;
  }

  private generateToken(user: any): string {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return JWT.sign(payload, this.secretKey, {
      expiresIn: '1h',
    });
  }

  private validateToken(token: string): any {
    return JWT.verify(token, this.secretKey);
  }
}
