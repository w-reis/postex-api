import { Router } from 'express';
import Correspondence from '../models/Correspondence';

const correspondencesRouter = Router();

const correspondences: Correspondence[] = [];

correspondencesRouter.post('/', (request, response) => {
  const { id, recipientName, objectNumber, status } = request.body;

  const correspondence = new Correspondence(
    id,
    recipientName,
    objectNumber,
    status
  );

  correspondences.push(correspondence);

  return response.json(correspondence);
});

export default correspondencesRouter;
