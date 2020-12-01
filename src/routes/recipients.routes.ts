import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';
import ensureRecipientAuthenticated from '../middlewares/ensureRecipientAuthenticated';

const recipientsRouter = Router();

const recipientsController = new RecipientsController();

recipientsRouter.post('/', recipientsController.create);

recipientsRouter.use(ensureRecipientAuthenticated);

recipientsRouter.get('/', recipientsController.index);

recipientsRouter.get('/:id', recipientsController.show);

recipientsRouter.put('/:id', recipientsController.update);

recipientsRouter.delete('/', recipientsController.delete);

export default recipientsRouter;
