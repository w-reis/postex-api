import { getCustomRepository } from 'typeorm';
import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  username: string;
  role: string;
}

class UpdateUserService {
  public async execute({
    id,
    username,
    role,
  }: Request): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.update(id, {
      username,
      role,
    });

    if (user.affected !== 1) {
      throw new AppError('Update failed, user not found.', 404);
    } else {
      const updatedUser = await usersRepository.findOne(id);
      return updatedUser;
    }
  }
}

export default UpdateUserService;
