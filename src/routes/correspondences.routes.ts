import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateCorrespondenceService from '../services/correspondence/CreateCorrespondenceService';
import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

import paginateCorrespondenceResult from '../middlewares/paginateCorrespondencesResult';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';
import UpdateCorrespondenceService from '../services/correspondence/UpdateCorrespondenceService';
import DeliverCorrespondenceService from '../services/correspondence/DeliveCorrespondenceService';

const correspondencesRouter = Router();

correspondencesRouter.use(ensureUserAuthenticated);

correspondencesRouter.get(
  '/',
  paginateCorrespondenceResult,
  async (request, response) => {
    return response.json(response.paginatedResults);
  }
);

correspondencesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const correspondencesRepository = getCustomRepository(
    CorrespondencesRepository
  );
  const correspondence = await correspondencesRepository.showCorrespondence(id);

  return response.json(correspondence);
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

correspondencesRouter.put('/:id', async (request, response) => {
  const { recipient_name, recipient_id, object_number } = request.body;
  const { id } = request.params;

  const updateCorrespondence = new UpdateCorrespondenceService();

  const correspondence = await updateCorrespondence.execute({
    id,
    recipient_name,
    recipient_id,
    object_number,
  });

  return response.json(correspondence);
});

correspondencesRouter.patch('/:id', async (request, response) => {
  const { id } = request.params;

  const deliverCorrespondence = new DeliverCorrespondenceService();

  const correspondence = await deliverCorrespondence.execute({
    id,
  });

  return response.json(correspondence);
});

correspondencesRouter.delete('/', async (request, response) => {
  const { idGroup }: { idGroup: string[] } = request.query;
  const correspondencesRepository = getCustomRepository(
    CorrespondencesRepository
  );

  await correspondencesRepository.deleteCorrespondence(idGroup);
  return response.sendStatus(200);
});

export default correspondencesRouter;
