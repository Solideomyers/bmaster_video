import { envs } from './config/envs';
import { AppDataSource } from './data-source/data-source';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  await AppDataSource.initialize();
  console.log('Database connected');

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
