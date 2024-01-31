import { LikeService } from '../likes/like.service';
import { Repository } from 'typeorm';
import { LikeEntity } from '../likes/entities/like.entity';
import { VideoEntity } from '../videos/entities/video.entity';
import { CustomError } from '../errors/custom.errors';

describe('LikeService', () => {
  let likeRepositoryMock: Partial<Repository<LikeEntity>>;
  let videoRepositoryMock: Partial<Repository<VideoEntity>>;
  let likeService: LikeService;

  beforeEach(() => {
    likeRepositoryMock = {
      save: jest.fn(),
    };

    videoRepositoryMock = {
      findOne: jest.fn(),
      increment: jest.fn(),
    };

    likeService = new LikeService(
      likeRepositoryMock as Repository<LikeEntity>,
      videoRepositoryMock as Repository<VideoEntity>
    );
  });

  describe('incrementLikes', () => {
    it('should increment likes for existing video', async () => {
      const videoId = 1;
      const existingVideo = new VideoEntity();
      existingVideo.id = videoId;

      (videoRepositoryMock.findOne as jest.Mock).mockResolvedValue(
        existingVideo
      );

      await likeService.incrementLikes(videoId);

      expect(videoRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: videoId },
      });
      expect(likeRepositoryMock.save).toHaveBeenCalledWith({
        videoId: 1,
        video: existingVideo,
      });
      expect(videoRepositoryMock.increment).toHaveBeenCalledWith(
        { id: videoId },
        'numLikes',
        1
      );
    });

    it('should throw error for non-existing video', async () => {
      const videoId = 2;

      (videoRepositoryMock.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(likeService.incrementLikes(videoId)).rejects.toThrowError(
        CustomError
      );
    });
  });
});
