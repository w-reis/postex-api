import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/user/CreateUserService';

import UsersRepository from '../repositories/UsersRepository';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json(response.paginatedResults);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, role } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.excute({
      username,
      password,
      role,
    });

    delete user.password;

    return response.json(user);
  }
}
