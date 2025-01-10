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

    static async complete(id: number, userId: string) {

        try {
            const todo = await prisma.todo.findFirst({
                where: {
                    id : Number(id),
                    userId, 
                }
            });

            if (!todo) {
                throw new Error('Todo not found!');
            }

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
            console.error('Complete todo error:', error);
            throw new Error('Complete todo failed!');
        }
    }

    static async delete(id: number, userId: string) {

        try {
            const todo = await prisma.todo.delete({
                where: {
                    id : Number(id),
                    userId, 
                }
            });

            if (!todo) {
                throw new Error('Todo not found!');
            }
            return todo;
        }
        catch (error) {
            console.error('Delete todo error:', error);
            throw new Error('Delete todo failed!');
        }
    }

    static async edit(id: number, title: string, description: string, dueDate: string, userId: string) {

        try {
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

            if (!todo) {
                throw new Error('Todo not found!');
            }
            return todo;
        }
        catch (error) {
            console.error('Edit todo error:', error);
            throw new Error('Edit todo failed!');
        }
    }

}