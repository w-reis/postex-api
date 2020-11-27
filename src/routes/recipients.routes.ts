import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const recipientsRouter = Router();

const recipientsController = new RecipientsController();

recipientsRouter.get('/', ensureUserAuthenticated, recipientsController.index);

recipientsRouter.post('/', recipientsController.create);

export default recipientsRouter;
