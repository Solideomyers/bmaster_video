import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create a new user
     *     description: Endpoint to create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User created successfully
     *       '400':
     *         description: Bad request, invalid input
     *       '500':
     *         description: Internal server error
     */
    this.router.post('/user', async (req, res) => {
      await this.userController.createUser(req, res);
    });

    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Obtain users
     *     description: Endpoint to get all users
     *     responses:
     *       '200':
     *         description: Users retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                   email:
     *                     type: string
     *                   password:
     *                     type: string
     *                   userName:
     *                     type: string
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                   updatedAt:
     *                     type: string
     *                     format: date-time
     *       '400':
     *         description: Bad request, users empty
     *       '500':
     *         description: Internal server error
     */

    this.router.get('/user', async (req, res) => {
      await this.userController.getAllUser(req, res);
    });

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Obtain user by ID
     *     description: Endpoint to get user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user to retrieve
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: User retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *                 userName:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *       '404':
     *         description: User not found
     *       '500':
     *         description: Internal server error
     */

    this.router.get('/user/:id', async (req, res) => {
      await this.userController.getUserById(req, res);
    });

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Obtain user by ID
     *     description: Endpoint to get user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user to retrieve
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: User retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *                 userName:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *       '404':
     *         description: User not found
     *       '500':
     *         description: Internal server error
     *
     *   put:
     *     summary: Update user's name and password
     *     description: Endpoint to update user's name and password
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user to update
     *         schema:
     *           type: integer
     *           format: int64
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User updated successfully
     *       '400':
     *         description: Bad request, invalid input
     *       '404':
     *         description: User not found
     *       '500':
     *         description: Internal server error
     */

    this.router.put('/user/:id', async (req, res) => {
      await this.userController.updateUser(req, res);
    });

    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     summary: Delete a user by ID
     *     description: Endpoint to delete a user by their ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user to delete
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       '200':
     *         description: User deleted successfully
     *       '404':
     *         description: User not found
     *       '500':
     *         description: Internal server error
     */

    this.router.delete('/user/:id', async (req, res) => {
      await this.userController.deleteUser(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
