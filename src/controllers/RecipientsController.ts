import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import RecipientsRepository from '../repositories/RecipientsRepository';

import CreateRecipientService from '../services/recipient/CreateRecipientService';

export default class RecipientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { recipient } = request.query;
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipients = await recipientsRepository.findByRecipientName(
      recipient?.toString()
    );

    return response.json(recipients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const recipientsRepository = getCustomRepository(RecipientsRepository);
    const correspondence = await recipientsRepository.showRecipient(id);

    return response.json(correspondence);
  }
}
