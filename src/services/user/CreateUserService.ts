import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  username: string;
  password: string;
  role: string;
}

class CreateUserService {
  public async excute({ username, password, role }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUsernameExists = await usersRepository.findOne({
      where: { username },
    });

    if (checkUsernameExists) {
      throw new AppError('Username already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
