// Imports
import { Request, Response } from 'express';
import TodoController from '../../controllers/todo.js';

// Fonction de suppression d'une tâche
export default async function Route_delete_Todo(req: Request, res: Response): Promise<any> {

    try {
        // Récupération de l'utilisateur et de la tâche
        const userId = req.user as string;
        const { id } = req.body as { id: number };

        // Vérification de l'existance de l'utilisateur et de la tâche
        if (!userId || !id) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Suppression de la tâche
        const todos = await TodoController.delete(id, userId);

        // Vérification de l'existance de la tâche
        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }

        // Renvoie un message de succès
        res.status(200).send({
            message: "Delete todo successful!",
            data: todos
        });

    } catch (error) {
        // Renvoie d'erreurs
        console.error('Delete todo error:', error);
        return res.status(500).json({
            message: "Delete todo failed!",
            error: (error as any).message,
        });
    }
}