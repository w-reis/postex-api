import { EntityRepository, Repository, Like } from 'typeorm';
import Recipient from '../models/Recipient';

import AppError from '../errors/AppError';

@EntityRepository(Recipient)
class RecipientsRepository extends Repository<Recipient> {
  public async findByRecipientName(
    name: string | undefined
  ): Promise<Recipient[]> {
    const findRecipient = await this.find({
      order: {
        created_at: 'DESC',
      },
      where: { name: Like(`%${name}%`) },
    });

    return findRecipient;
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
