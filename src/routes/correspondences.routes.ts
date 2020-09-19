import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateCorrespondenceService from '../services/CreateCorrespondenceService';
import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';

const correspondencesRouter = Router();

correspondencesRouter.use(ensureUserAuthenticated);

correspondencesRouter.get('/', async (request, response) => {
  const correspondencesRepository = getCustomRepository(
    CorrespondencesRepository
  );
  const correspondences = await correspondencesRepository.find();

  return response.json(correspondences);
});

correspondencesRouter.post('/', async (request, response) => {
  const { recipient_name, recipient_id, object_number } = request.body;

  const createCorrespondence = new CreateCorrespondenceService();

  await createCorrespondence.execute({
    recipient_name,
    recipient_id,
    object_number,
    status: 'pendente',
  });

  return response.sendStatus(200);
});

export default correspondencesRouter;
