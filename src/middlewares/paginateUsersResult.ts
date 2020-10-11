import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

export interface Paginate {
  result: User[];
  next: { page: number; limit: number };
  previous: { page: number; limit: number };
  start: number;
  end: number;
  currentPage: number;
  totalPages: number;
}

export default async function paginateUsersResult(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { query, limit, page } = request.query;

  const usersRepository = getCustomRepository(UsersRepository);

  const start = (Number(page) - 1) * Number(limit);
  const end = Number(page) * Number(limit);
  const total = await usersRepository.count();

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
    const users = await usersRepository.find({
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

    paginate.result = users;
  } else {
    const [users, totalResult] = await usersRepository.findByUserName(
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
    paginate.result = users;
  }

  response.paginatedResults = paginate;
  next();
}
