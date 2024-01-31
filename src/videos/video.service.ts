import { VideoEntity } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { Repository } from 'typeorm';
import { CustomError } from '../errors/custom.errors';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthService } from '../authentication/auth.service';
import { JwtAdapter } from '../authentication/jwt';

export class VideoService {
  constructor(private videoRepository: Repository<VideoEntity>) {}
  async createVideo(
    videoDto: CreateVideoDto,
    token: string
  ): Promise<VideoEntity> {
    const userId = this.getUserIdFromToken(token);
    const data = userId.then((res) => res);
    console.log(data);
    const videoExist = await this.videoRepository.findOne({
      where: { url: videoDto.url },
    });

    if (!userId) {
      throw new CustomError(401, 'Unauthorized');
    }

    if (videoExist) {
      throw new CustomError(500, 'Video already exist');
    }

    const video = new VideoEntity();
    video.title = videoDto.title;
    video.url = videoDto.url;
    video.description = videoDto.description;
    video.view = videoDto.view;
    // video.user = userId

    return await this.videoRepository.save(video);
  }

  async getAllVideos(token: string): Promise<VideoEntity[]> {
    console.log(token);
    const userId = await this.getUserIdFromToken(token);
    console.log(userId, 'service');
    if (!userId) {
      return await this.getPublicVideos();
    }
    return await this.videoRepository.find();
  }

  async getVideoById(id: number): Promise<VideoEntity> {
    const video = await this.videoRepository.findOne({ where: { id: id } });
    if (!video) {
      throw CustomError.notFound('Video no encontrado');
    }
    return video;
  }

  async updateVideo(
    id: number,
    updateDto: UpdateVideoDto
  ): Promise<VideoEntity> {
    const video = await this.videoRepository.findOne({ where: { id: id } });
    if (!video) {
      throw CustomError.notFound('Video no encontrado');
    }

    if (updateDto.title) {
      video.title = updateDto.title;
    }

    if (updateDto.description) {
      video.description = updateDto.description;
    }

    if (updateDto.view) {
      video.view = updateDto.view;
    }

    return await this.videoRepository.save(video);
  }

  private async getUserIdFromToken(token: string): Promise<number | null> {
    const decodedToken: any = await JwtAdapter.validateToken<{
      id: number;
    }>(token);
    return decodedToken ? decodedToken.id : 'invalid';
  }

  public async isValidToken(token: string): Promise<boolean> {
    try {
      const decodedToken: any = await JwtAdapter.validateToken(token);
      return !!decodedToken;
    } catch (error) {
      return false;
    }
  }

  private async getPublicVideos(): Promise<VideoEntity[]> {
    return await this.videoRepository.find({ where: { view: 'public' } });
  }
}
