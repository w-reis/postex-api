import { Router } from 'express';

import RecipientsController from '../controllers/RecipientsController';

const recipientsRouter = Router();

const recipientsController = new RecipientsController();

recipientsRouter.get('/', recipientsController.index);

recipientsRouter.post('/', recipientsController.create);

export default recipientsRouter;
