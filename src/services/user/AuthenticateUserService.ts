import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../errors/AppError';

import authConfig from '../../config/auth';
import User from '../../models/User';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const { user_secret, expiresIn }: any = authConfig.jwt;

    const token = sign({}, user_secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
