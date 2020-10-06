import { Router } from 'express';

import paginateCorrespondenceResult from '../middlewares/paginateCorrespondencesResult';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';
import CorrespondencesController from '../controllers/CorrespondencesController';

const correspondencesRouter = Router();

const correspondencesController = new CorrespondencesController();

correspondencesRouter.use(ensureUserAuthenticated);

correspondencesRouter.get(
  '/',
  paginateCorrespondenceResult,
  correspondencesController.index
);

correspondencesRouter.get('/:id', correspondencesController.show);

correspondencesRouter.post('/', correspondencesController.create);

correspondencesRouter.put('/:id', correspondencesController.update);

correspondencesRouter.patch('/:id', correspondencesController.deliver);

correspondencesRouter.delete('/', correspondencesController.delete);

export default correspondencesRouter;
