import { getCustomRepository } from 'typeorm';
import Correspondence from '../models/Correspondence';
import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

interface Request {
  recipient_name: string;
  recipient_id: number;
  object_number: string;
}

class CreateCorrespondenceService {
  public async execute({
    recipient_name,
    recipient_id,
    object_number,
  }: Request): Promise<Correspondence> {
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );
    const correspondence = correspondencesRepository.create({
      recipient_name,
      recipient_id,
      object_number,
    });

    await correspondencesRepository.save(correspondence);

    return correspondence;
  }
}

export default CreateCorrespondenceService;
