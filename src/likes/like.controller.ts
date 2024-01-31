import { Request, Response } from 'express';
import { LikeService } from './like.service';
import { AppDataSource } from '../data-source/data-source';
import { CustomError } from '../errors/custom.errors';
import { LikeEntity } from './entities/like.entity';
import { VideoEntity } from '../videos/entities/video.entity';

export class LikeController {
  private likeService: LikeService;

  constructor() {
    const likeRepository = AppDataSource.getRepository(LikeEntity);
    const videoRepository = AppDataSource.getRepository(VideoEntity);
    this.likeService = new LikeService(likeRepository, videoRepository);
  }

  async incrementLikes(req: Request, res: Response) {
    try {
      const videoId: number = parseInt(req.params.videoId);

      const result = await this.likeService.incrementLikes(videoId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al incrementar los likes:', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  }
}
