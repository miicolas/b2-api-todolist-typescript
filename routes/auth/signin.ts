// Imports
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthController from '../../controllers/auth.js';
import { LoginUser } from '../../utils/types.js';

// Fonction de connexion
export default async function Route_Signin(req: Request, res: Response) :Promise<any> {
    try {
        // Récupération de la requête
        const { email, password } = req.body;

        console.log(email,password, 'email, password');

        // Vérification de l'existance de l'email et du mot de passe
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Récupération de l'utilisateur
        const user = await AuthController.login({ email, password } as LoginUser);

        console.log(user, 'user');
        // Vérification de l'existance de l'utilisateur
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Vérificatino de l'existance du JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        console.log(process.env.JWT_SECRET)
        // Création d'un TOKEN valable 24h
        const token = jwt.sign(
            { id: user.user.id, email: user.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        console.log(token, 'token');    

        // Revoie un message de succès
        return res.status(200).json({
            message: "Login successful!",
            data: { token },
        });
    } catch (error) {
        // Renvoie d'erreur
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Login failed!",
            error: (error as any).message,
        });
    }
}
