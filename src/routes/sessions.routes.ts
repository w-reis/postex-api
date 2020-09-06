import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AuthenticateRecipientService from '../services/AuthenticateRecipientService';

const sessionsRouter = Router();

sessionsRouter.post('/user', async (request, response) => {
  const { username, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    username,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

sessionsRouter.post('/recipient', async (request, response) => {
  const { email, password } = request.body;

  const authenticateRecipient = new AuthenticateRecipientService();

  const { recipient, token } = await authenticateRecipient.execute({
    email,
    password,
  });

  delete recipient.password;

  return response.json({ recipient, token });
});

export default sessionsRouter;
