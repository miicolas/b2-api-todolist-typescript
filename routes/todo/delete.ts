import { Request, Response } from 'express';
import TodoController from '../../controllers/todo.js';

export default async function Route_delete_Todo(req: Request, res: Response): Promise<any> {

    try {

        const userId = req.user as string;
        const { id } = req.body as { id: number };

        if (!userId || !id) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        const todos = await TodoController.delete(id, userId);

        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }

        res.status(200).send({
            message: "Delete todo successful!",
            data: todos
        });

    } catch (error) {
        console.error('Delete todo error:', error);
        return res.status(500).json({
            message: "Delete todo failed!",
            error: (error as any).message,
        });
    }
}