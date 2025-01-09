// Type RegisterUser
export type RegisterUser = {
    email: string;
    hash: string;
    name: string;
}

// Type LoginUser
export type LoginUser = {
    email: string;
    password: string;
}

// Type comparePassword
export type comparePassword = {
    password: string;
    hash: string;
}

// Type TodoBase
export type TodoBase = {
    title: string;
    description?: string;
    dueDate?: Date;
    userId: string ;
}
