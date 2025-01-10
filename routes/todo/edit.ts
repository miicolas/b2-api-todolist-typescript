// Imports
import { Request, Response } from 'express';
import TodoController from '../../controllers/todo.js';

// Fonction de modification d'une tâche
export default function Route_edit_Todo(req: Request, res: Response): any {

    try {
        // Récupération de l'utilisateur et de la tâche
        const userId = req.user as string;
        const { id, title, description, dueDate } = req.body as { id: number, title: string, description: string, dueDate: string };

        // Vérification de l'existance de l'utilisateur et de la tâche
        if (!userId || !id || !title || !description || !dueDate) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Modification de la tâche
        const todos = TodoController.edit(id, title, description, dueDate, userId);

        // Vérification de l'existance de la tâche
        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }

        // Renvoie un message de succès
        res.status(200).send({
            message: "Edit todo successful!",
            data: todos
        });

    } catch (error) {
        // Renvoie d'erreur
        console.error('Edit todo error:', error);
        return res.status(500).json({
            message: "Edit todo failed!",
            error: (error as any).message,
        });
    }
}