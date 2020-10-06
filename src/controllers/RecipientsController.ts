import { Request, Response } from 'express';

import CreateRecipientService from '../services/recipient/CreateRecipientService';

export default class RecipientsController {
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
}
