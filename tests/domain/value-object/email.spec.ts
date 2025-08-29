import { Email } from "../../../src/domain/value-objects/email";

describe("Email Value Object", () => {
    it("should create a valid email", () => {
        const email = Email.create("test@mail.com");
        expect(email.getValue()).toBe("test@mail.com");
    });

    it("should throw an error for invalid email", () => {
        expect(() => Email.create("invalid-email")).toThrow("Invalid email format");
    });
});