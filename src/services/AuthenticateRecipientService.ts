import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import Recipient from '../models/Recipient';

interface Request {
  email: string;
  password: string;
}

interface Response {
  recipient: Recipient;
  token: string;
}

class AuthenticateRecipientService {
  public async execute({ email, password }: Request): Promise<Response> {
    const recipientsRepository = getRepository(Recipient);

    const recipient = await recipientsRepository.findOne({
      where: { email },
    });

    if (!recipient) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, recipient.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { recipient_secret, expiresIn } = authConfig.jwt;

    const token = sign({}, recipient_secret, {
      subject: recipient.id.toString(),
      expiresIn,
    });

    return {
      recipient,
      token,
    };
  }
}

export default AuthenticateRecipientService;
