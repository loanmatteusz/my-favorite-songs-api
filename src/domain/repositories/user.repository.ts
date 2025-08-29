import type { User } from "../entities/user.entity";

export interface UserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
}
