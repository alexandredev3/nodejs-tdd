import { Router } from 'express';

const routes = Router();

import authMiddlware from './app/middleware/auth';

import SessionController from './app/controllers/SessionController';
import DashboardController from './app/controllers/DashboardController';

const sessionController = new SessionController();

const dashboardController = new DashboardController();

// Definição de rotas:
routes.post('/sessions', sessionController.store);

routes.use(authMiddlware);

routes.get('/dashboard', dashboardController.index);

export default routes;
