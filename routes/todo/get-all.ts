import { Request, Response } from 'express';
import TodoController from '@/controllers/todo.js';

export default async function Route_getAll_Todos(req:Request, res:Response):Promise<any> {
   
    try {
   
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Missing required fields!" });
        }
    
    
        const todos = await TodoController.getTodos(userId);
    
        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }
    
         res.status(200).send(todos);
    } catch (error) {
        console.error('Get all todos error:', error);
        return res.status(500).json({
            message: "Get all todos failed!",
            error: (error as any).message,
        });
    }
}