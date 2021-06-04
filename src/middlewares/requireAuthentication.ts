import { AppError } from '../errors/appError'
import { UserRepository } from '../modules/accounts/repository/UserRepository'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

type TAuthPayload = {
  sub: string;
}

export async function requireAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing authentication token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const verifiedToken = verify(token, "defcd0f5633333ad07784f2aed8a542b");

    const { sub: user_id } = verifiedToken as TAuthPayload;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist.", 401);
    }

    req.user = { id: user_id };

    next();
  } catch (error) {
    throw new AppError("Invalid token.", 401);
  }
}
