
// Imports
import AuthController from "../../controllers/auth.js";
import CypherController from "../../controllers/cypher.js";
import { Request, Response } from "express";

// Fonction de création de compte
export default async function Route_Signup(req: Request, res: Response):Promise<any> {
    try {
        // Récupération de la requête
        const { email, password, name } = req.body;

        // Vérification de l'existance du mot de passe, de l'email et du name
        if (!password || !email || !name) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Vérification de la longueur du mot de passe
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long!" });
        }

        // Hachement du mot du passe
        const hash = CypherController.hashPassword(password);

        // Vérification du hachement
        if (!hash) {
            return res.status(500).json({ message: "Failed to hash password!" });
        }

        // Création de l'utilisateur
        const user = await AuthController.register({ email, hash, name });

        // Renvoie un message de succès
        return res.status(201).json({
            message: "Register successful!",
            data: user
        });
    } catch (error) {
        // Renvoie d'erreur
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Registration failed!",
            error: (error as any).message
        });
    }
}