import { Request, Response } from 'express';
import { AppDataSource } from '../data-source/data-source';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = AppDataSource.getRepository(UserEntity);
    this.userService = new UserService(userRepository);
  }

  async createUser(req: Request, res: Response) {
    try {
      const userDto: CreateUserDto = req.body;

      const createUser = await this.userService.createUser(userDto);
      res.status(201).json(createUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  }
}
