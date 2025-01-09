import { Request, Response } from 'express';
import AuthController from '../../controllers/auth.js';


export default async function Route_Me(req: Request, res: Response) :Promise<any> {
    try {
        const userId = req.user as string;

        if (!userId) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        const user = await AuthController.getUser(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        return res.status(200).json({
            message: "Get user successful!",
            data: user
        });

    }
    catch (error) {
        console.error('Get user error:', error);
        return res.status(500).json({
            message: "Get user failed!",
            error: (error as any).message
        });
    }
}   