import { EntityRepository, Repository, Like } from 'typeorm';
import User from '../models/User';

import AppError from '../errors/AppError';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByUserName(
    name: string | undefined,
    take: number,
    skip: number
  ): Promise<[User[], number]> {
    const [findUser, total] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      where: { username: Like(`%${name}%`) },
      take,
      skip,
    });

    return [findUser, total];
  }

  public async showUser(id: string): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }

  public async deleteUser(ids: string[]): Promise<void> {
    await this.delete(ids);
  }
}

export default UsersRepository;
