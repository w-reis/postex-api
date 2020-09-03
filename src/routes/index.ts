import { Router } from 'express';
import correspondencesRouter from './correspondences.routes';

const routes = Router();

routes.use('/correspondences', correspondencesRouter);

export default routes;
