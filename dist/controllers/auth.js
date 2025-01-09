var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import CypherController from "./cypher.js";
// Appel de Prisma
const prisma = new PrismaClient();
// Class AuthController
export default class AuthController {
    // Méthode de création d'utilisateurs
    static register(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, hash, name }) {
            try {
                // Si il manque un élément -> renvoi une erreur
                if (!name || !hash || !email) {
                    throw new Error("Missing required fields");
                }
                // Création d'un utilisateur
                const user = yield prisma.user.create({
                    data: {
                        email,
                        password: hash,
                        name
                    }
                });
                return user;
            }
            catch (error) {
                // Création d'un message d'erreur
                throw new Error("Register failed");
            }
        });
    }
    // Récupération de l'utilisateur
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérification de l'existance du SECRET
                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined");
                }
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            }
            catch (error) {
                // Création d'un message d'erreur
                throw new Error("Invalid token");
            }
        });
    }
    // Méthode de connexion
    static login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Trouve l'utilisateur selon son email
            try {
                const user = yield AuthController.getUserByEmail(email);
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
            }
            catch (error) {
                // Création d'un message d'erreur
                throw new Error("Login failed");
            }
        });
    }
    // Méthode de récupération d'un utilisateur
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérification de l'existance de l'utilisateur
                if (!id) {
                    throw new Error("Missing required fields");
                }
                const user = yield prisma.user.findUnique({
                    where: {
                        id
                    }
                });
                return user;
            }
            catch (error) {
                // Création d'un message d'erreur
                throw new Error("Get user failed");
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérification de l'existance de l'utilisateur
                if (!email) {
                    throw new Error("Missing required fields");
                }
                const user = yield prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                return user;
            }
            catch (error) {
                // Création d'un message d'erreur
                throw new Error("Get user failed");
            }
        });
    }
}
//# sourceMappingURL=auth.js.map