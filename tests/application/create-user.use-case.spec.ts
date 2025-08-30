import { CreateUserInput } from "../../src/application/dtos/create-user.input";
import { CreateUserUseCase } from "../../src/application/use-cases/create-user.use-case";
import { User } from "../../src/domain/entities/user.entity";
import { UserRepository } from "../../src/domain/repositories/user.repository";
import { IdGenerator } from "../../src/domain/services/id-generator.service";
import { PasswordHasher } from "../../src/domain/services/password-hasher.service";
import { Email } from "../../src/domain/value-objects/email";

describe("Create User UseCase", () => {
    const fakeUser: User = {
        id: "fake-id-generated",
        name: "FakeTester",
        email: Email.create("test@mail.com"),
        password: { value: "hashed-password" },
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const fakeRepository: UserRepository = {
        create: jest.fn(async (user) => user),
        findById: jest.fn(async (id: string) => id === fakeUser.id ? fakeUser : null),
        findByEmail: jest.fn(async (email: string) => email === fakeUser.email.getValue() ? fakeUser : null),
    };
    const fakeHasher: PasswordHasher = {
        hash: jest.fn(async (plain: string) => `hashed-${plain}`),
        compare: jest.fn(async (plain: string, hashed: string) => hashed === `hashed-${plain}`),
    };
    const fakeIdGenerator: IdGenerator = {
        generate: jest.fn(() => "uuid-123"),
    };
    const createUser = CreateUserUseCase({
        userRepository: fakeRepository,
        hashPassword: fakeHasher,
        idGenerator: fakeIdGenerator,
    });

    let userInput: CreateUserInput;
    beforeEach(() => {
        userInput = {
            name: "Tester",
            email: "tester@test.com",
            password: "T3st!@#$%",
        };
    })

    it("should create a new user when the email does not exist", async () => {
        const newUser = await createUser(userInput);
        expect(newUser).toBeDefined();
        expect(newUser.email.getValue()).toBe(userInput.email);
    });

    it("should throw an error when the email is already in use", async () => {
        userInput.email = "test@mail.com";
        const promise = createUser(userInput);
        await expect(promise).rejects.toThrow("Email already in use");
    });

    it("should assign the ID returned by the IdGenerator to the new user", async () => {
        const newUser = await createUser(userInput);
        expect(newUser).toBeDefined();
        expect(newUser.id).toBe("uuid-123");
    });

    it("should hash the user password", async () => {
        const newUser = await createUser(userInput);
        expect(newUser).toBeDefined();
        expect(newUser.password.value).toEqual(`hashed-${userInput.password}`);
    });

    it("should throw an error for invalid email format", async () => {
        userInput.email = "invalid-email.com";
        const promise = createUser(userInput);
        await expect(promise).rejects.toThrow("Invalid email format");
    });
});
