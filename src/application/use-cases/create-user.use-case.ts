// Types
import type { User } from "../../domain/entities/user.entity";
import type { CreateUserInput } from "../dtos/create-user.input";
import type { UserRepository } from "../../domain/repositories/user.repository";

// Value Objects
import { Email } from "../../domain/value-objects/email";
import { createPassword } from "../../domain/value-objects/password";
import { PasswordHasher } from "../../domain/services/password-hasher.service";
import { IdGenerator } from "../../domain/services/id-generator.service";

export function CreateUserUseCase(deps: {
    userRepository: UserRepository,
    hashPassword: PasswordHasher,
    idGenerator: IdGenerator,
}) {
    return async function (input: CreateUserInput): Promise<User> {
        const email = Email.create(input.email);

        const existing = await deps.userRepository.findByEmail(email.getValue())
        if (existing) throw new Error("Email already in use");

        const id = deps.idGenerator.generate();
        const passwordVO = await createPassword(input.password, deps.hashPassword);

        const newUser: User = {
            id,
            name: input.name,
            email,
            password: passwordVO,
        }

        return deps.userRepository.create(newUser);
    }
}
