import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

import CreateCorrespondenceService from '../services/correspondence/CreateCorrespondenceService';
import UpdateCorrespondenceService from '../services/correspondence/UpdateCorrespondenceService';
import DeliverCorrespondenceService from '../services/correspondence/DeliveCorrespondenceService';

export default class CorrespondencesController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json(response.paginatedResults);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { recipient_name, recipient_id, object_number } = request.body;

    const createCorrespondence = new CreateCorrespondenceService();

    await createCorrespondence.execute({
      recipient_name,
      recipient_id,
      object_number,
      status: 'pendente',
    });

    return response.sendStatus(200);
  }

  public async update(request: Request, response: Response): Promise<Response> {
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
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { idGroup } = request.query;
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );

    await correspondencesRepository.deleteCorrespondence(idGroup as string[]);
    return response.sendStatus(200);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );
    const correspondence = await correspondencesRepository.showCorrespondence(
      id
    );

    return response.json(correspondence);
  }

  public async deliver(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const deliverCorrespondence = new DeliverCorrespondenceService();

    const correspondence = await deliverCorrespondence.execute({
      id,
    });

    return response.json(correspondence);
  }

  public async count(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );
    const correspondence = await correspondencesRepository.countCorrespondence(
      id?.toString()
    );

    return response.json(correspondence);
  }
}
