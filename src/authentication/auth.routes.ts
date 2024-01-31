import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppDataSource } from '../data-source/data-source';
import { UserEntity } from '../user/entities/user.entity';

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    const userRepository = AppDataSource.getRepository(UserEntity);
    this.authController = new AuthController(new AuthService(userRepository));

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: Sign up
     *     description: Endpoint to sign up and obtain a JWT token
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       '201':
     *         description: Token generated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       '500':
     *         description: Internal server error
     */
    this.router.post('/signup', async (req, res) => {
      await this.authController.signup(req, res);
    });

    /**
     * @swagger
     * /auth/signin:
     *   post:
     *     summary: Sign in
     *     description: Endpoint to sign in and obtain a JWT token
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Token generated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       '401':
     *         description: Invalid email or password
     *       '500':
     *         description: Internal server error
     */
    this.router.post('/signin', async (req, res) => {
      await this.authController.signin(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
