import { VideoEntity } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { Repository } from 'typeorm';
import { CustomError } from '../errors/custom.errors';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthService } from '../authentication/auth.service';
import { JwtAdapter } from '../authentication/jwt';

export class VideoService {
  constructor(
    private videoRepository: Repository<VideoEntity>,
    private jwtAdapter: JwtAdapter
  ) {}
  async createVideo(
    videoDto: CreateVideoDto,
    token: string
  ): Promise<VideoEntity> {
    const userId = this.getUserIdFromToken(token);

    if (!userId) {
      throw new CustomError(401, 'Unauthorized');
    }

    // Crear una nueva instancia de VideoEntity a partir de los datos del DTO
    const video = new VideoEntity();
    video.title = videoDto.title;
    video.url = videoDto.url;
    video.description = videoDto.description;
    video.view = videoDto.view;

    // Guardar el nuevo video en la base de datos
    return await this.videoRepository.save(video);
  }

  async getAllVideos(): Promise<VideoEntity[]> {
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
    const decodedToken: any = await this.jwtAdapter.validateToken<{
      id: number;
    }>(token);
    return decodedToken ? decodedToken.id : null;
  }
}
