import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create a new user
     *     description: Endpoint to create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User created successfully
     *       '400':
     *         description: Bad request, invalid input
     *       '500':
     *         description: Internal server error
     */
    this.router.post('/user', async (req, res) => {
      await this.userController.createUser(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
