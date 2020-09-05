import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateCorrespondenceService from '../services/CreateCorrespondenceService';
import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const correspondencesRouter = Router();

correspondencesRouter.use(ensureAuthenticated);

correspondencesRouter.get('/', async (request, response) => {
  const correspondencesRepository = getCustomRepository(
    CorrespondencesRepository
  );
  const correspondences = await correspondencesRepository.find();

  return response.json(correspondences);
});

correspondencesRouter.post('/', async (request, response) => {
  try {
    const { recipient_name, recipient_id, object_number } = request.body;

    const createCorrespondence = new CreateCorrespondenceService();

    const correspondence = await createCorrespondence.execute({
      recipient_name,
      recipient_id,
      object_number,
      status: 'pendente',
    });

    return response.json(correspondence);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default correspondencesRouter;
