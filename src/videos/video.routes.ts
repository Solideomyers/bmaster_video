import { Router } from 'express';
import { VideoController } from './video.controller';
import { LikeController } from '../likes/like.controller';

export class VideoRoutes {
  private router: Router;
  private videoController: VideoController;
  private likeController: LikeController;
  constructor() {
    this.router = Router();
    this.videoController = new VideoController();
    this.likeController = new LikeController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', async (req, res) => {
      await this.videoController.createVideo(req, res);
    });

    this.router.get('/', async (req, res) => {
      await this.videoController.getAllVideos(req, res);
    });

    this.router.get('/:id', async (req, res) => {
      await this.videoController.getVideoById(req, res);
    });

    this.router.put('/:id', async (req, res) => {
      await this.videoController.updateVideo(req, res);
    });

    this.router.post('/:videoId', async (req, res) => {
      await this.likeController.incrementLikes(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
