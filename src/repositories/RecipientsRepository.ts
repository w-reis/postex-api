import { EntityRepository, Repository, Like } from 'typeorm';
import Recipient from '../models/Recipient';

import AppError from '../errors/AppError';

@EntityRepository(Recipient)
class RecipientsRepository extends Repository<Recipient> {
  public async findByRecipientName(
    name: string | undefined,
    take: number,
    skip: number
  ): Promise<[Recipient[], number]> {
    const [findRecipient, total] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      where: { name: Like(`%${name}%`) },
      take,
      skip,
    });

    return [findRecipient, total];
  }

  public async showRecipient(id: string): Promise<Recipient> {
    const recipient = await this.findOne(id);

    if (!recipient) {
      throw new AppError('Recipient not found.', 404);
    }

    return recipient;
  }

  public async deleteRecipient(ids: string[]): Promise<void> {
    await this.delete(ids);
  }
}

export default RecipientsRepository;