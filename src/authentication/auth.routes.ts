import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AppDataSource } from '../data-source/data-source';
import { UserEntity } from '../user/entities/user.entity';

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    const userRepository = AppDataSource.getRepository(UserEntity);
    this.router = Router();
    this.authController = new AuthController(userRepository);

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
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
     *               username:
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
     *         description: Unauthorized, invalid credentials
     */
    this.router.post('/signin', async (req, res) => {
      await this.authController.signin(req, res);
    });

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
     *       '200':
     *         description: Token generated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *       '400':
     *         description: Bad request, invalid user data
     */
    this.router.post('/signup', async (req, res) => {
      await this.authController.signup(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
