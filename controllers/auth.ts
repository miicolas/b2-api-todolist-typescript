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
    static async register({ email, hash, name }: RegisterUser) {
        try {
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
        } catch (error) {
            // Création d'un message d'erreur
            throw new Error("Register failed");
        }
    }

    // Récupération de l'utilisateur
    static async verifyToken(token: string) {
        try {
            // Vérification de l'existance du SECRET
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
    static async login({ email, password }: LoginUser) {
        // Trouve l'utilisateur selon son email

        try {

            const user = await AuthController.getUserByEmail(email);
            // Vérification de l'existence de l'utilisateur
            if (!user) {
                throw new Error("User not found");
            }
            // Vérification du hachement du mot de passe
            if (!CypherController.comparePassword({ password, hash: user.password })) {
                throw new Error("Incorrect password");
            }
            
            // Vérification de l'existance du SECRET
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }

            // Création d'un token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        } catch (error) {
            // Création d'un message d'erreur
            throw new Error("Login failed");
        }
    }

    // Méthode de récupération d'un utilisateur
    static async getUser(id: string) {
        try {
            // Vérification de l'existance de l'utilisateur
            if (!id) {
                throw new Error("Missing required fields");
            }
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            });
            return user;
        } catch (error) {
            // Création d'un message d'erreur
            throw new Error("Get user failed");
        }
    }

    static async getUserByEmail(email: string) {
        try {
            // Vérification de l'existance de l'utilisateur
            if (!email) {
                throw new Error("Missing required fields");
            }
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            return user;
        } catch (error) {
            // Création d'un message d'erreur
            throw new Error("Get user failed");
        }
    }
}