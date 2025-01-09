// Imports
import { Request, Response } from "express";
import TodoController from "../../controllers/todo.js";
import { TodoBase } from "../../utils/types.js";

// Fonction de création de tâche
export default async function Route_Create_Todo(req: Request, res: Response):Promise<any> {

    try {
        // Récupération de la requête
        const { title, description, dueDate }:TodoBase = req.body;
        const userId = req.user as string;

        // Vérification de l'existance de title et de userId
        if (!title || !userId) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Vérification de la longueur du titre
        if (title.length < 3) {
            return res.status(400).json({ message: "Title must be at least 3 characters long!" });
        }

        // Création de la tâche
        const todo = await TodoController.create({ title, description, dueDate, userId });

        // Renvoie un message de succès
        return res.status(201).json({
            message: "Create todo successful!",
            data: todo
        });

    } catch (error) {
        // Renvoie d'erreur
        console.error('Create todo error:', error);
        return res.status(500).json({
            message: "Create todo failed!",
            error: (error as any).message,
        });
    }
}