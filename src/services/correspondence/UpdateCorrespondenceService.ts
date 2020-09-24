import { getCustomRepository } from 'typeorm';
import Correspondence from '../../models/Correspondence';
import CorrespondencesRepository from '../../repositories/CorrespondencesRepository';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  recipient_name: string;
  recipient_id: number;
  object_number: string;
}

class UpdateCorrespondenceService {
  public async execute({
    id,
    recipient_name,
    recipient_id,
    object_number,
  }: Request): Promise<Correspondence | undefined> {
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );

    const correspondence = await correspondencesRepository.update(id, {
      recipient_name,
      recipient_id,
      object_number,
    });

    if (correspondence.affected !== 1) {
      throw new AppError('Update failed, correspondence not found.', 404);
    } else {
      const updatedCorrespondence = await correspondencesRepository.findOne(id);
      return updatedCorrespondence;
    }
  }
}

export default UpdateCorrespondenceService;
