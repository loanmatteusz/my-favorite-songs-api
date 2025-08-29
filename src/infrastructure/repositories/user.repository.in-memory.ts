import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryInMemory implements UserRepository {

    constructor(
        private users: User[],
    ) { }

    public create(user: User): Promise<User> {
        const newUser: User = {
            ...user,
        }
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }

    public findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            return Promise.resolve(null);
        }
        return Promise.resolve(user);
    }

    public findByEmail(email: string): Promise<any> {
        const user = this.users.find(user => user.email.getValue() === email);
        if (!user) {
            return Promise.resolve(null);
        }
        return Promise.resolve(user);
    }
}
