// Imports
import { Request, Response } from 'express';
import AuthController from '../../controllers/auth.js';

// Récupération de l'utilisateur
export default async function Route_Me(req: Request, res: Response) :Promise<any> {
    try {
        // Récupération de l'id
        const userId = req.user as string;

        // Vérification de l'existance de l'id
        if (!userId) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Récupération de l'utilisateur
        const user = await AuthController.getUser(userId);

        // Vérification de l'existance de l'utilisateur
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Renvoie de message de succès
        return res.status(200).json({
            message: "Get user successful!",
            data: user
        });

    }
    catch (error) {
        // Renvoi d'erreurs
        console.error('Get user error:', error);
        return res.status(500).json({
            message: "Get user failed!",
            error: (error as any).message
        });
    }
}   