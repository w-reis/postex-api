import { getRepository } from 'typeorm';
import User from '../models/User';

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
      throw new Error('Username already used.');
    }

    const user = usersRepository.create({
      username,
      password,
      role,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
