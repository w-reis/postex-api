import { EntityRepository, Repository, Like } from 'typeorm';
import Correspondence from '../models/Correspondence';

import AppError from '../errors/AppError';

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
}

export default CorrespondencesRepository;
