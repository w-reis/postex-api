import { Router } from 'express';
import correspondencesRouter from './correspondences.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/correspondences', correspondencesRouter);
routes.use('/users', usersRouter);

export default routes;
