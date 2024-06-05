import { Request, Response } from 'express';
import authService from './auth.service';
const authController = {
  login: async (req: Request, res: Response) => {
    const { loginType, email, password } = req.body;
    console.log('🚀 =========  { email, password }:', {
      email,
      password,
    });
    try {
      const newAccount = await authService.login({
        loginType: loginType ? loginType : 'Normal',
        email,
        password,
      });
      return res.status(201).json({
        message: 'Login successfully.',
        data: newAccount,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.toString() });
    }
  },
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('🚀 =========  { email, password }:', {
      email,
      password,
    });
    try {
      const newAccount = await authService.register({
        email,
        password,
      });
      return res.status(201).json({
        message: 'Create successfully.',
        data: newAccount,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.toString() });
    }
  },
};
export default authController;
