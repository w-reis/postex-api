import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const recipientsRouter = Router();

const recipientsController = new RecipientsController();

recipientsRouter.use(ensureUserAuthenticated);

recipientsRouter.get('/', recipientsController.index);

recipientsRouter.post('/', recipientsController.create);

export default recipientsRouter;
