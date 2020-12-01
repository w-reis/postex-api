import { getCustomRepository } from 'typeorm';
import Recipient from '../../models/Recipient';
import RecipientsRepository from '../../repositories/RecipientsRepository';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  CEP: string;
  address: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

class UpdateRecipientService {
  public async execute({
    id,
    CEP,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
  }: Request): Promise<Recipient | undefined> {
    const recipientsRepository = getCustomRepository(RecipientsRepository);

    const recipient = await recipientsRepository.update(id, {
      CEP,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
    });

    if (recipient.affected !== 1) {
      throw new AppError('Update failed, recipient not found.', 404);
    } else {
      const updatedRecipient = await recipientsRepository.findOne(id);
      return updatedRecipient;
    }
  }
}

export default UpdateRecipientService;
