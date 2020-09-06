import { Router } from 'express';
import correspondencesRouter from './correspondences.routes';
import usersRouter from './users.routes';
import recipientsRouter from './recipients.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/correspondences', correspondencesRouter);
routes.use('/users', usersRouter);
routes.use('/recipients', recipientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
