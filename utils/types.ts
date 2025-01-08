export type RegisterUser = {
    email: string;
    hash: string;
    name: string;
}

export type LoginUser = {
    email: string;
    password: string;
}

export type comparePassword = {
    password: string;
    hash: string;
}

export type TodoBase = {
    title: string;
    description?: string;
    dueDate?: Date;
    userId: string ;
}
