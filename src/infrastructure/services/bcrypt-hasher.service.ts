import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/services/password-hasher.service";

export const bcryptPasswordHasher: PasswordHasher = {
    hash: (plain: string) => bcrypt.hash(plain, 10),
    compare: (plain: string, hashed: string) => bcrypt.compare(plain, hashed),
};
