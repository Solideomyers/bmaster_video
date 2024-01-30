import { Request, Response, Router } from 'express';
import { UserController } from './user.controller';

export class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/user', async (req, res) => {
      await this.userController.createUser(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
