import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AppDataSource } from '../data-source/data-source';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

export class AuthController {
  private authService: AuthService;

  constructor(public readonly userRepository: Repository<UserEntity>) {
    this.authService = new AuthService(userRepository);
  }

  async signin(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.signin(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.signup(req.body as CreateUserDto);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
