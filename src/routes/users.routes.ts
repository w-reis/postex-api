import { Router } from 'express';

import paginateUserResult from '../middlewares/paginateUsersResult';
import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.use(ensureUserAuthenticated);

usersRouter.get('/', paginateUserResult, usersController.index);

usersRouter.get('/:id', usersController.show);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

usersRouter.delete('/', usersController.delete);

export default usersRouter;
