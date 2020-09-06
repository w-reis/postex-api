import { EntityRepository, Repository, Like } from 'typeorm';
import Correspondence from '../models/Correspondence';

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
}

export default CorrespondencesRepository;
