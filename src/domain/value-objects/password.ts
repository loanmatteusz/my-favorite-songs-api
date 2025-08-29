import { PasswordHasher } from "../services/password-hasher.service";

export type Password = {
    value: string;
};

export const validatePassword = (raw: string): Password => {
    if (!raw) throw new Error("Password cannot be empty");
    if (raw.length < 8) throw new Error("Password must have at least 8 characters");
    if (!/[A-Z]/.test(raw)) throw new Error("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(raw)) throw new Error("Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(raw)) throw new Error("Password must contain at least one number");
    if (!/[^A-Za-z0-9]/.test(raw)) throw new Error("Password must contain at least one symbol");

    return { value: raw };
}

export const createPassword = async (
    raw: string,
    hashFn: PasswordHasher,
): Promise<Password> => {
    validatePassword(raw);
    const hashed = await hashFn.hash(raw);
    return { value: hashed };
};

export const matchesPassword = async (password: Password, plain: string, hashFn: PasswordHasher): Promise<boolean> => {
    return hashFn.compare(plain, password.value);
};
