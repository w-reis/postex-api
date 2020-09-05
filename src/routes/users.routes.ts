import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { username, password, role } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.excute({
    username,
    password,
    role,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
