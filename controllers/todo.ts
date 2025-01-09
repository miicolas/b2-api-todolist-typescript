// Imports
import { PrismaClient } from "@prisma/client";
import { TodoBase } from "../utils/types.js";

// Appel de Prisma
const prisma = new PrismaClient();

// Class TodoController
export default class TodoController {

    // Méthode de création de tâches
    static async create({ title, description, dueDate, userId }: TodoBase) {

        // Si il manque un élément -> renvoi une erreur
        if (!title || !description || !dueDate || !userId) {
            throw new Error("Missing required fields");
        }

        // Création d'une tâche
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                userId
            }
        });

        return todo;
    }

    // Méthode de récupération des tâches
    static async getTodos(userId: string) {

        try {
            // Récupération des tâches
            const todos = await prisma.todo.findMany({
                where: {
                    userId
                },
            });
            return todos;
        } catch (error) {
            // Renvoie d'erreur
            console.error('Get todos error:', error);
            throw new Error('Get todos failed!');
        }
    }
}