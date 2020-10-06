import { getCustomRepository } from 'typeorm';
import Correspondence from '../../models/Correspondence';
import CorrespondencesRepository from '../../repositories/CorrespondencesRepository';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class DeliverCorrespondenceService {
  public async execute({ id }: Request): Promise<Correspondence | undefined> {
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );

    const correspondence = await correspondencesRepository.update(id, {
      status: 'entregue',
    });

    if (correspondence.affected !== 1) {
      throw new AppError('Deliver failed, correspondence not found.', 404);
    } else {
      const deliveredCorrespondence = await correspondencesRepository.findOne(
        id
      );
      return deliveredCorrespondence;
    }
  }
}

export default DeliverCorrespondenceService;
