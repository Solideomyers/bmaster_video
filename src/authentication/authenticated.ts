import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from './jwt';

export function Authenticated(
  target: string | any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authorization token is missing' });
    }

    try {
      const decodedToken = await JwtAdapter.validateToken(token);
      if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      return originalMethod.apply(this, arguments);
    } catch (error) {
      console.error('Error validating token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  return descriptor;
}
