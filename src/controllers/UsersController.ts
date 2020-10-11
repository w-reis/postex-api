import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { username, role } = request.body;
    const { id } = request.params;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      username,
      role,
    });

    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { idGroup } = request.query;
    const usersRepository = getCustomRepository(UsersRepository);

    await usersRepository.deleteUser(idGroup as string[]);
    return response.sendStatus(200);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.showUser(id);

    delete user.password;

    return response.json(user);
  }
}
