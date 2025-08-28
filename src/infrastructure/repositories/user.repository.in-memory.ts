import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryInMemory implements UserRepository {
    public nextId: string = "1";

    constructor(
        private users: User[],
    ) {
        this.users = [];
    }

    public create(user: User): Promise<User> {
        const newUser: User = {
            ...user,
            id: this.nextId,
        }
        this.nextId = String(Number(this.nextId) + 1);
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }

    public findById(id: string): Promise<any> {
        return Promise.resolve("");
    }

    public findByEmail(email: string): Promise<any> {
        return Promise.resolve("");
    }
}
