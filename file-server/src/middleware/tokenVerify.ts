import jwt from 'jsonwebtoken';

import type { Response, NextFunction, Request } from 'express';
import type { MyRequest } from '../typings/express';
import type { JwtPayload, Secret } from 'jsonwebtoken';

const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = (req as MyRequest).headers['authorization'];
  const token = authHeader?.split(' ').pop();

  if (!(typeof token === 'string')) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (error, user) => {
      if (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const { id, email } = user as JwtPayload;

      (req as MyRequest).email = String(email);
      (req as MyRequest).id = Number(id);
      next();
    },
  );
};

export default tokenVerify;
