import { PasswordHasher } from "../../../src/domain/services/password-hasher.service";
import { createPassword, matchesPassword, Password, validatePassword } from "../../../src/domain/value-objects/password";

describe("Password Value Object", () => {
    const passwordHasher: PasswordHasher = {
        hash: async (plain: string) => `hashed-${plain}`,
        compare: async (plain: string, hashed: string) => hashed === `hashed-${plain}`,
    };

    describe("createPassword", () => {
        it("should create a password", async () => {
            const password = await createPassword("T3st!@#$%", passwordHasher);

            expect(password.value).toBe("hashed-T3st!@#$%");
        });
    });

    describe("validatePassword", () => {
        it("should pass for valid password", () => {
            expect(() => validatePassword("T3st!@#$%")).not.toThrow();
        });
        it("should throw if empty", () => {
            expect(() => validatePassword("")).toThrow("Password cannot be empty");
        });
        it("should throw if password len isn't least 8 characters", () => {
            expect(() => validatePassword("T3st!@#" /* 7 characters */)).toThrow("Password must have at least 8 characters");
        });
        it("should throw if password doesn't contain uppercase letter", () => {
            expect(() => validatePassword("t3st!@#$%")).toThrow("Password must contain at least one uppercase letter");
        });
        it("should throw if password doesn't contain lowercase letter", () => {
            expect(() => validatePassword("T3EST!@#$%")).toThrow("Password must contain at least one lowercase letter");
        });
        it("should throw if password doesn't contain number", () => {
            expect(() => validatePassword("Test!@#$%")).toThrow("Password must contain at least one number");
        });
        it("should throw if password doesn't contain any symbol", () => {
            expect(() => validatePassword("T3st12345")).toThrow("Password must contain at least one symbol");
        });
    });

    describe("matchPassword", () => {
        it("should return true for matching password", async () => {
            const password: Password = await createPassword("T3st!@#$%", passwordHasher);
            const result = await matchesPassword(password, "T3st!@#$%", passwordHasher);
            expect(result).toBe(true);
        });
        it("should return false for non-matching password", async () => {
            const password: Password = await createPassword("T3st!@#$%", passwordHasher);
            const result = await matchesPassword(password, "NonT3st!@#$%", passwordHasher);
            expect(result).toBe(false);
        });
    });
});
