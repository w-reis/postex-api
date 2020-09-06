import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Recipient from '../models/Recipient';

interface Request {
  name: string;
  email: string;
  password: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  CEP: string;
}

class CreateRecipientService {
  public async excute({
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
  }: Request): Promise<Recipient> {
    const recipientsRepository = getRepository(Recipient);

    const checkRecipientExists = await recipientsRepository.findOne({
      where: { email },
    });

    if (checkRecipientExists) {
      throw new AppError('Email already used.');
    }

    const hashedPassword = await hash(password, 8);

    const recipient = recipientsRepository.create({
      name,
      password: hashedPassword,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      CEP,
    });

    await recipientsRepository.save(recipient);

    return recipient;
  }
}

export default CreateRecipientService;
