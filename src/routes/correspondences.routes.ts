import { Router } from 'express';

const correspondencesRouter = Router();

const correspondences = [];

correspondencesRouter.post('/', (request, response) => {
  const { id, recipientName, objectNumber, status } = request.body;

  const correspondence = {
    id,
    recipientName,
    objectNumber,
    status,
  };

  correspondences.push(correspondence);

  return response.json(correspondence);
});

export default correspondencesRouter;
