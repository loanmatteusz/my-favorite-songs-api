// Types
import type { User } from "../../domain/entities/user.entity";
import type { CreateUserInput } from "../dtos/create-user.input";
import type { UserRepository } from "../../domain/repositories/user.repository";

// Value Objects
import { Email } from "../../domain/value-objects/email";
import { createPassword } from "../../domain/value-objects/password";

export function CreateUserUseCase(deps: {
    userRepository: UserRepository,
    hashPassword: (plain: string) => Promise<string>,
    idGenerator: () => string,
}) {
    return async function (input: CreateUserInput): Promise<User> {
        const email = Email.create(input.email);

        const existing = await deps.userRepository.findByEmail(email.getValue())
        if (existing) throw new Error("Email already in use");

        const id = deps.idGenerator();
        const passwordVO = await createPassword(input.password, deps.hashPassword);

        const newUser: User = {
            id,
            name: input.name,
            email,
            password: passwordVO,
        }

        // Posso retornar o resultado com `await` caso eu precise manipular o valor na camada onde fica o controller
        return deps.userRepository.create(newUser);
    }
}
