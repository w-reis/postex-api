import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret: any = authConfig.jwt.user_secret;
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: parseInt(sub, 10),
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
