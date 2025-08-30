import { User } from "../../../src/domain/entities/user.entity";
import { Email } from "../../../src/domain/value-objects/email";
import { UserRepositoryInMemory } from "../../../src/infrastructure/repositories/user.repository.in-memory";

describe("UserRepositoryInMemory Implementation", () => {
    let repository: UserRepositoryInMemory;
    let userDb: User[];
    let fakeUser: User;

    beforeEach(() => {
        userDb = [];
        repository = new UserRepositoryInMemory(userDb);
        fakeUser = {
            id: "fake-id-generated",
            name: "FakeTester",
            email: Email.create("test@mail.com"),
            password: { value: "hashed-password" },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    it("should create a new user and return it", async () => {
        const newUser = await repository.create(fakeUser);
        expect(newUser).toEqual(fakeUser);
    });

    it("should store the created user in memory", async () => {
        await repository.create(fakeUser);
        expect(userDb.length).toBe(1);
    });

    it("should find a user by id", async () => {
        await repository.create(fakeUser);
        const found = await repository.findById(fakeUser.id);
        expect(found).not.toBeNull();
        expect(found).not.toBeUndefined();
        expect(found!.id).toBe(fakeUser.id);
    });

    it("should return null if id not found", async () => {
        await repository.create(fakeUser);
        const found = await repository.findById("nonexisted-fake-id");
        expect(found).toBeNull();
    });

    it("should find a user by email", async () => {
        await repository.create(fakeUser);
        const found = await repository.findByEmail(fakeUser.email.getValue());
        expect(found).not.toBeNull();
        expect(found).not.toBeUndefined();
        expect(found!.email!.getValue()).toBe(fakeUser.email.getValue());
    });

    it("should return null if email not found", async () => {
        await repository.create(fakeUser);
        const found = await repository.findByEmail("nonexisted-fake-email@mail.com");
        expect(found).toBeNull();
    });

    // // Aqui talvez devesse haver mais implementações, pois seria um findAll onde eu, provavelmente, implementaria filtro e paginação
    // it("should handle multiple users");
});
