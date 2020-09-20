import { EntityRepository, Repository, Like } from 'typeorm';
import Correspondence from '../models/Correspondence';

import AppError from '../errors/AppError';

@EntityRepository(Correspondence)
class CorrespondencesRepository extends Repository<Correspondence> {
  public async findByRecipientName(
    name: string
  ): Promise<Correspondence[] | null> {
    const findCorrespondence = await this.find({
      where: { recipient_name: Like(`%${name}%`) },
    });

    return findCorrespondence || null;
  }

  public async showCorrespondence(id: string): Promise<Correspondence> {
    const correspondence = await this.findOne(id);

    if (!correspondence) {
      throw new AppError('Correspondence not found.', 404);
    }

    return correspondence;
  }
}

export default CorrespondencesRepository;
