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

    // Méthode de complétion d'une tâche
    static async complete(id: number, userId: string) {

        try {
            // Récupération de la tâche
            const todo = await prisma.todo.findFirst({
                where: {
                    id : Number(id),
                    userId, 
                }
            });

            // vérification de l'existance de la tâche
            if (!todo) {
                throw new Error('Todo not found!');
            }

            // Complétion de la tâche
            const updatedTodo = await prisma.todo.update({
                where: {
                    id : Number(id),
                },
                data: {
                    completed: !todo.completed
                }
            });

            return updatedTodo;
        }
        catch (error) {
            // Renvoie d'erreurs
            console.error('Complete todo error:', error);
            throw new Error('Complete todo failed!');
        }
    }

    // Méthode de suppression de la tâche
    static async delete(id: number, userId: string) {

        try {
            // Récupération et  suppression de la tâche
            const todo = await prisma.todo.delete({
                where: {
                    id : Number(id),
                    userId, 
                }
            });

            // Vérification de l'existance de la tâche
            if (!todo) {
                throw new Error('Todo not found!');
            }

            return todo;
        }
        catch (error) {
            // Renvoi d'erreurs
            console.error('Delete todo error:', error);
            throw new Error('Delete todo failed!');
        }
    }

    // Méthode de modification de la tâche
    static async edit(id: number, title: string, description: string, dueDate: string, userId: string) {

        try {
            // Récupération et modification de la tâche
            const todo = await prisma.todo.update({
                where: {
                    id : Number(id),
                    userId, 
                },
                data: {
                    title,
                    description,
                    dueDate: dueDate ? new Date(dueDate) : undefined,
                }
            });

            // Vérification de l'existance de la tâche
            if (!todo) {
                throw new Error('Todo not found!');
            }

            return todo;
        }
        catch (error) {
            // Renvoi d'erreurs
            console.error('Edit todo error:', error);
            throw new Error('Edit todo failed!');
        }
    }

}