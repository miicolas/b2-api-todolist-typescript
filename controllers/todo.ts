import { PrismaClient } from "@prisma/client";
import { TodoBase } from "../utils/types.js";

const prisma = new PrismaClient();

export default class TodoController {

    static async create({ title, description, dueDate, userId }: TodoBase) {
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

    static async getTodos(userId: string) {
        const todos = await prisma.todo.findMany({
            where: {
                userId
            }
        });

        return todos;
    }
}