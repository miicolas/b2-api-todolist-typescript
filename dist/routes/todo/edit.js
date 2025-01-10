import TodoController from '../../controllers/todo.js';
export default function Route_edit_Todo(req, res) {
    try {
        const userId = req.user;
        const { id, title, description, dueDate } = req.body;
        if (!userId || !id || !title || !description || !dueDate) {
            return res.status(400).json({ message: "Missing required fields!" });
        }
        const todos = TodoController.edit(id, title, description, dueDate, userId);
        if (!todos) {
            return res.status(404).json({ message: "No todos found!" });
        }
        res.status(200).send({
            message: "Edit todo successful!",
            data: todos
        });
    }
    catch (error) {
        console.error('Edit todo error:', error);
        return res.status(500).json({
            message: "Edit todo failed!",
            error: error.message,
        });
    }
}
//# sourceMappingURL=edit.js.map