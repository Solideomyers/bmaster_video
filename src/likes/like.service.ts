import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
import { VideoEntity } from '../videos/entities/video.entity';
import { CustomError } from '../errors/custom.errors';

export class LikeService {
  constructor(
    private likeRepository: Repository<LikeEntity>,
    private videoRepository: Repository<VideoEntity>
  ) {}

  async incrementLikes(videoId: number) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });
    console.log(video);

    if (!video) {
      throw CustomError.notFound('Video no encontrado');
    }

    await this.likeRepository.save({ videoId: 1, video });

    await this.videoRepository.increment({ id: videoId }, 'numLikes', 1);

    return { message: 'Like registrado correctamente' };
  }
}
