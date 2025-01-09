// Imports
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import CypherController from "./cypher.js";
import { RegisterUser, LoginUser } from "../utils/types.js";

// Appel de Prisma
const prisma = new PrismaClient();

// Class AuthController
export default class AuthController {

    // Méthode de création d'utilisateurs
    static async register({email, hash, name }: RegisterUser) {
        // Si il manque un élément -> renvoi une erreur
        if (!name || !hash || !email) {
            throw new Error("Missing required fields");
        }

        // Création d'un utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                name
            }
        });

        return user;
    }

    // Récupération de l'utilisateur
    static async verifyToken(token : string) {
        try {
            // Vérification de l'existance du TOKEN
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return user;
        } catch (error) {
            // Création d'un message d'erreur
            throw new Error("Invalid token");
        }
    }

    // Méthode de connexion
    static async login({email, password}: LoginUser) {
        // Trouve l'utilisateur selon son email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        // Vérification de l'existance de l'utilisateur
        if (!user) {
            return null;
        }
        // Vérification du hachement du mot de passe
        if (!CypherController.comparePassword({ password, hash: user.password })) {
            return null;
        }
        return user;
    }
}