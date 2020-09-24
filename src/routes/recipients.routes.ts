import { Router } from 'express';

import CreateRecipientService from '../services/recipient/CreateRecipientService';

const recipientsRouter = Router();

recipientsRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
    CEP,
  } = request.body;

  const createRecipient = new CreateRecipientService();

  const recipient = await createRecipient.excute({
    name,
    email,
    password,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
    CEP,
  });

  delete recipient.password;

  return response.json(recipient);
});

export default recipientsRouter;
