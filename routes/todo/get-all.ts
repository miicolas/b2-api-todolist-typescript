// Imports
import { Request, Response } from 'express';
import TodoController from '../../controllers/todo.js';

// Fonction de récupération des tâches
export default async function Route_getAll_Todos(req: Request, res: Response): Promise<any> {

    try {
        // Récupération de la requête
        const userId = req.user as string;

        // Vérification de l'existance de userId
        if (!userId) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Récupération des tâches
        const todos = await TodoController.getTodos(userId);

        // Vérification de l'existance de tâches
        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }

        // Renvoie un message de succès
        res.status(200).send({
            message: "Get all todos successful!",
            data: todos
        });

    } catch (error) {
        // Renvoie d'erreur
        console.error('Get all todos error:', error);
        return res.status(500).json({
            message: "Get all todos failed!",
            error: (error as any).message,
        });
    }
}