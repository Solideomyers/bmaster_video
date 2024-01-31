import { Request, Response } from 'express';
import { VideoEntity } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';
import { AppDataSource } from '../data-source/data-source';
import { CustomError } from '../errors/custom.errors';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthService } from '../authentication/auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtAdapter } from '../authentication/jwt';

export class VideoController {
  private videoService: VideoService;
  private jwtAdapter: JwtAdapter;

  constructor() {
    const videoRepository = AppDataSource.getRepository(VideoEntity);
    this.videoService = new VideoService(videoRepository);
    this.jwtAdapter = new JwtAdapter();
  }

  async createVideo(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new CustomError(401, 'Unauthorized');
      }

      const videoDto: CreateVideoDto = req.body;

      const createdVideo: VideoEntity = await this.videoService.createVideo(
        videoDto,
        token
      );

      res.status(201).json(createdVideo);
    } catch (error) {
      console.error('Error al crear el video:', error);
      res.status(500).json({ message: error || 'Error al crear el video' });
    }
  }

  async getAllVideos(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      console.log(token);

      const videos: VideoEntity[] = await this.videoService.getAllVideos(
        token || ''
      );
      res.status(200).json(videos);
    } catch (error) {
      console.error('Error getting all videos:', error);
      res.status(500).json({ message: 'Error getting all videos' });
    }
  }

  async getVideoById(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const video: VideoEntity = await this.videoService.getVideoById(id);
      res.status(200).json(video);
    } catch (error) {
      console.error('Error al obtener el video por ID:', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Video no encontrado' });
      }
    }
  }

  async updateVideo(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const updateDto: UpdateVideoDto = req.body;

      const updateVideo: VideoEntity = await this.videoService.updateVideo(
        id,
        updateDto
      );

      res.status(200).json(updateVideo);
    } catch (error) {
      return CustomError.badRequest('Error al actualizar el video');
    }
  }
}
