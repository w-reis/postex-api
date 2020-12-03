import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';
import ensureRecipientAuthenticated from '../middlewares/ensureRecipientAuthenticated';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const recipientsRouter = Router();

const recipientsController = new RecipientsController();

recipientsRouter.post('/', recipientsController.create);

recipientsRouter.get('/', ensureUserAuthenticated, recipientsController.index);

recipientsRouter.use(ensureRecipientAuthenticated);

recipientsRouter.get('/:id', recipientsController.show);

recipientsRouter.put('/:id', recipientsController.update);

recipientsRouter.delete('/', recipientsController.delete);

export default recipientsRouter;
