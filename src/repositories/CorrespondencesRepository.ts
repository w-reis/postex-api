import { EntityRepository, Repository, Like } from 'typeorm';
import Correspondence from '../models/Correspondence';

import AppError from '../errors/AppError';

import getFormattedDate from '../utils/getFormattedDate';

@EntityRepository(Correspondence)
class CorrespondencesRepository extends Repository<Correspondence> {
  public async findByRecipientName(
    name: string | undefined,
    take: number,
    skip: number
  ): Promise<[Correspondence[], number]> {
    const [findCorrespondence, total] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      where: { recipient_name: Like(`%${name}%`) },
      take,
      skip,
    });

    return [findCorrespondence, total];
  }

  public async showCorrespondence(id: string): Promise<Correspondence> {
    const correspondence = await this.findOne(id);

    if (!correspondence) {
      throw new AppError('Correspondence not found.', 404);
    }

    return correspondence;
  }

  public async deleteCorrespondence(ids: string[]): Promise<void> {
    await this.delete(ids);
  }

  public async countCorrespondence(id: string | undefined): Promise<any> {
    const [lastTotal, total] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      select: ['created_at'],
      where: { recipient_id: id },
      take: 1,
    });

    const [lastPending, pending] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      select: ['created_at'],
      where: { recipient_id: id, status: 'pendente' },
      take: 1,
    });

    const [lasRetired, retired] = await this.findAndCount({
      order: {
        created_at: 'DESC',
      },
      select: ['created_at'],
      where: { recipient_id: id, status: 'entregue' },
      take: 1,
    });

    const result = {
      all: {
        total,
        last: getFormattedDate(lastTotal[0].created_at),
      },

      pending: {
        total: pending,
        last: getFormattedDate(lastPending[0].created_at),
      },

      retired: {
        total: retired,
        last: getFormattedDate(lasRetired[0].created_at),
      },
    };

    return result;
  }
}

export default CorrespondencesRepository;
