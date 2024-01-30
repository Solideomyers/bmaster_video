import { AppDataSource } from '../data-source/data-source';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CustomError } from '../errors/custom.errors';
import { Request, Response } from 'express';

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
      throw new CustomError(404, 'Error to create user');
    }
  }
}
