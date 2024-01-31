import { Router } from 'express';
import { UserRoutes } from '../user/user.routes';
import { AuthRoutes } from '../authentication/auth.routes';
import { VideoRoutes } from '../videos/video.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const userRoutes = new UserRoutes();
    const authRoutes = new AuthRoutes();
    const videoRoutes = new VideoRoutes();

    router.use('/user', userRoutes.getRouter());
    router.use('/auth', authRoutes.getRouter());
    router.use('/videos', videoRoutes.getRouter());

    return router;
  }
}
