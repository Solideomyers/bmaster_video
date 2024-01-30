import { Router } from 'express';
import { UserRoutes } from '../user/user.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const userRoutes = new UserRoutes();
    router.use('/', userRoutes.getRouter());

    return router;
  }
}
