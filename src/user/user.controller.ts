import { Request, Response } from 'express';
import { AppDataSource } from '../data-source/data-source';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CustomError } from '../errors/custom.errors';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  async getAllUser(req: Request, res: Response) {
    try {
      const users: UserEntity[] = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log('Error to bring users');
      res.status(500).json({ message: 'Error users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const user: UserEntity = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      throw CustomError.internalServer;
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const updateDto: UpdateUserDto = req.body;

      const updatedUser: UserEntity = await this.userService.updateUser(
        id,
        updateDto
      );
      res.status(200).json({ message: 'Update successfully' });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);

      const deleteUser: UserEntity = await this.userService.deleteUser(id);
      res.status(200).json(deleteUser);
    } catch (error) {
      console.error('Error to delete user', error);
      res.status(500).json({ message: 'Error to delete' });
    }
  }
}
