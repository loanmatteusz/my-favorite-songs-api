import type { User } from "../entities/user.entity";

export interface UserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
