import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryInMemory implements UserRepository {

    constructor(
        private users: User[],
    ) {
        this.users = [];
    }

    public create(user: User): Promise<User> {
        const newUser: User = {
            ...user,
        }
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
