import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const token = await this.authService.signup(userData);
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  }

  async signin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.signin({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
}
