export type Password = {
    value: string;
};

export const createPassword = async (
    raw: string,
    hashFn: (plain: string) => Promise<string>,
): Promise<Password> => {
    validatePassword(raw);
    const hashed = await hashFn(raw);
    return { value: hashed };
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

export const matchesPassword = (password: Password, plain: string): boolean => {
    return password.value === plain;
};
