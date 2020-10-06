import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import Correspondence from '../models/Correspondence';
import CorrespondencesRepository from '../repositories/CorrespondencesRepository';

export interface Paginate {
  result: Correspondence[];
  next: { page: number; limit: number };
  previous: { page: number; limit: number };
  start: number;
  end: number;
  currentPage: number;
  totalPages: number;
}

export default async function paginateCorrespondencesResult(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { query, limit, page } = request.query;

  const correspondencesRepository = getCustomRepository(
    CorrespondencesRepository
  );

  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);
  const total = await correspondencesRepository.count();

  const paginate = {} as Paginate;

  if (start > 0) {
    paginate.previous = {
      page: Number(page) - 1,
      limit: Number(limit),
    };
  }

  if (page && limit) {
    paginate.currentPage = Number(page);
    paginate.totalPages = Math.ceil(total / Number(limit));
  }

  if (!query) {
    const correspondences = await correspondencesRepository.find({
      order: {
        created_at: 'DESC',
      },
      skip: start,
      take: Number(limit),
    });

    if (end < total) {
      paginate.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    paginate.result = correspondences;
  } else {
    const [
      correspondences,
      totalResult,
    ] = await correspondencesRepository.findByRecipientName(
      query?.toString(),
      Number(limit),
      start
    );

    if (end < totalResult) {
      paginate.next = {
        page: Number(page) + 1,
        limit: Number(limit),
      };
    }

    paginate.totalPages = Math.ceil(totalResult / Number(limit));
    paginate.result = correspondences;
  }

  response.paginatedResults = paginate;
  next();
}
