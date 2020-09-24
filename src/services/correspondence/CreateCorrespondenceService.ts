import { getCustomRepository } from 'typeorm';
import CorrespondencesRepository from '../../repositories/CorrespondencesRepository';

interface Request {
  recipient_name: string;
  recipient_id: number;
  object_number: string;
  status: string;
}

class CreateCorrespondenceService {
  public async execute({
    recipient_name,
    recipient_id,
    object_number,
    status,
  }: Request): Promise<void> {
    const correspondencesRepository = getCustomRepository(
      CorrespondencesRepository
    );
    const correspondence = correspondencesRepository.create({
      recipient_name,
      recipient_id,
      object_number,
      status,
    });

    await correspondencesRepository.save(correspondence);
  }
}

export default CreateCorrespondenceService;
