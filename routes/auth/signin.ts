import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthController from '../../controllers/auth.js';
import { LoginUser } from '../../utils/types.js';

export default async function Route_Signin(req: Request, res: Response) :Promise<any> {
    try {
        const { email, password } = req.body;

        console.log(email,password, 'email, password');

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields!" });
        }


        const user = await AuthController.login({ email, password } as LoginUser);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(token, 'token');    

        return res.status(200).json({
            message: "Login successful!",
            data: { token },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Login failed!",
            error: (error as any).message,
        });
    }
}
