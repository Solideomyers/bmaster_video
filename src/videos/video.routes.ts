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
    /**
     * @swagger
     * /videos:
     *   post:
     *     summary: Create a new video
     *     description: Creates a new video
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 minLength: 3
     *               url:
     *                 type: string
     *               description:
     *                 type: string
     *               view:
     *                 type: string
     *                 enum:
     *                   - public
     *                   - private
     *               userId:
     *                 type: integer
     *             required:
     *               - title
     *               - url
     *               - description
     *               - view
     *               - userId
     *     responses:
     *       '201':
     *         description: A new video was created successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VideoEntity'
     *       '500':
     *         description: Error while creating the video.
     */

    this.router.post('/', async (req, res) => {
      await this.videoController.createVideo(req, res);
    });

    /**
     * @swagger
     * /videos:
     *   get:
     *     summary: Get all videos
     *     description: Retrieves a list of all videos.
     *     responses:
     *       '200':
     *         description: A list of videos was retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/VideoEntity'
     *       '500':
     *         description: Error while fetching the videos.
     */

    this.router.get('/', async (req, res) => {
      await this.videoController.getAllVideos(req, res);
    });

    /**
     * @swagger
     * /videos/{id}:
     *   get:
     *     summary: Get a video by ID
     *     description: Retrieves a video by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the video to retrieve.
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: The video was retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VideoEntity'
     *       '404':
     *         description: Video not found.
     *       '500':
     *         description: Error while fetching the video.
     */
    this.router.get('/:id', async (req, res) => {
      await this.videoController.getVideoById(req, res);
    });

    /**
     * @swagger
     * /videos/{id}:
     *   put:
     *     summary: Update a video by ID
     *     description: Updates a video with the specified ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the video to update.
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       required: true
     *       description: Video data to update.
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateVideoDto'
     *     responses:
     *       '200':
     *         description: The video was updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/VideoEntity'
     *       '400':
     *         description: Invalid request body.
     *       '404':
     *         description: Video not found.
     *       '500':
     *         description: Error while updating the video.
     */
    this.router.put('/:id', async (req, res) => {
      await this.videoController.updateVideo(req, res);
    });

    /**
     * @swagger
     * /videos/{videoId}:
     *   post:
     *     summary: Increment likes for a video
     *     description: Increments the number of likes for the specified video.
     *     parameters:
     *       - in: path
     *         name: videoId
     *         required: true
     *         description: ID of the video to increment likes.
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: Likes incremented successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message indicating success.
     *       '404':
     *         description: Video not found.
     *       '500':
     *         description: Error while incrementing likes.
     */
    this.router.post('/:videoId', async (req, res) => {
      await this.likeController.incrementLikes(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
