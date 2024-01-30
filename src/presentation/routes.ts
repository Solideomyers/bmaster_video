import { Router } from 'express';
import { UserRoutes } from '../user/user.routes';
import { AuthRoutes } from '../authentication/auth.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const userRoutes = new UserRoutes();
    const authRoutes = new AuthRoutes();

    router.use('/user', userRoutes.getRouter());
    router.use('/auth', authRoutes.getRouter());

    return router;
  }
}
