import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { usersAPI, codeAPI, errorLogManager } from 'database';

import jwtGenerate from '../utils/jwtGenerate';
import checkEmailUnique from '../utils/checkEmailUnique';
import mailAPI from '../services/mail/mail.api';

import type { Request, Response } from 'express';
import type { JwtPayload, Secret } from 'jsonwebtoken';
import type { MyRequest } from '../typings/express';

class AuthController {
  async registrationCode(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Check is email is registered
      const isEmailUnique = checkEmailUnique(email);
      if (!isEmailUnique) {
        errorLogManager.addToLogs(
          'Double email registration',
          `Email: ${email}`,
        );
        return res.status(400).json({ message: 'Email is registered!' });
      }

      const code = await codeAPI.create(email);
      await mailAPI.send(email, code);

      res.status(200).json({ message: 'Code send' });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in registrationCode',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async registration(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, username, code } = req.body;

      // Check code
      const isCodeCorrect = codeAPI.check(email, code);
      if (!isCodeCorrect) {
        return res.status(400).json({ message: 'Code is wrong' });
      }

      // Crypt password
      const hashPassword: string = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_CRYPT!,
      ).toString();

      // Add to database
      const user = await usersAPI.post(
        firstName,
        lastName,
        username,
        hashPassword,
        email.toLowerCase(),
      );

      if (!user) {
        errorLogManager.addToLogs(
          'Error in AuthController in registration. User === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(500).json({ message: 'Can not create user!' });
      }
      // Generate tokens
      const { accessToken, refreshToken } = jwtGenerate(user!.id, user!.email);

      // Send tokens
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ message: accessToken });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in registration',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password, code } = req.body;

      // Check code
      if (!code) {
        return res.status(400).json({ message: 'Code is wrong' });
      }
      const isCodeCorrect = await codeAPI.check(email, code);

      if (!isCodeCorrect) {
        return res.status(400).json({ message: 'Code is wrong' });
      }

      const users = await usersAPI.getAllByEmail(email);

      if (!users) {
        errorLogManager.addToLogs(
          'Error in AuthController in login. Users === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(400).json({ message: 'Check your email/password' });
      }

      if (users!.length === 0) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      const { email: emailDB, password: passwordDB } = users![0];

      const decryptPassword = CryptoJS.AES.decrypt(
        passwordDB,
        process.env.PASSWORD_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);

      const isPasswordValid = decryptPassword === password;
      const isEmailValid =
        emailDB.toLocaleLowerCase() === emailDB.toLocaleLowerCase();

      if (!isEmailValid || !isPasswordValid) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      const { accessToken, refreshToken } = jwtGenerate(
        users![0].id,
        users![0].email,
      );

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ message: accessToken });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in login',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async loginCode(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const users = await usersAPI.getAllByEmail(email.toLowerCase());

      if (!users) {
        errorLogManager.addToLogs(
          'Error in AuthController in loginCode. Users === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(400).json({ message: 'Check your email/password' });
      }

      if (users!.length === 0) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      const code = await codeAPI.create(email);
      await mailAPI.send(email, code);

      const { email: emailDB, password: passwordDB } = users![0];

      const decryptPassword = CryptoJS.AES.decrypt(
        passwordDB,
        process.env.PASSWORD_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);
      const isPasswordValid = decryptPassword === password;
      const isEmailValid =
        emailDB.toLocaleLowerCase() === emailDB.toLocaleLowerCase();

      if (!isEmailValid || !isPasswordValid) {
        return res.status(400).json({ message: 'Check your email/password' });
      }

      res.status(200).json({ message: 'Code send' });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in loginCode',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = (req as MyRequest).cookies.refreshToken;

      if (typeof refreshToken !== 'string') {
        return res.status(400).json({ message: 'Log in again' });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret,
        (error, user) => {
          if (error) {
            res.clearCookie('refreshToken');
            return res.status(400).json({ message: 'Log in again' });
          }

          const { id, email } = user as JwtPayload;

          const { refreshToken, accessToken } = jwtGenerate(id, email);

          res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.status(200).json({ message: accessToken });
        },
      );
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in refresh',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'You logout' });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in AuthController in logout',
        `${(error as Error).message}`,
      );
      return res.status(401).json({ message: (error as Error).message });
    }
  }
}

const authController = new AuthController();

export default authController;
