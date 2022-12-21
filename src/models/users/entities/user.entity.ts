export class User {
    id: string;
    email: string;
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
