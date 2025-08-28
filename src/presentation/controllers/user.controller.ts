import type { Request, Response } from "express";
import type { CreateUserInput } from "../../application/dtos/create-user.input";
import { User } from "../../domain/entities/user.entity";
import { CreateUserRequest } from "../dtos/create-user.request";
import { CreateUserResponse } from "../dtos/create-user.response";


export function makeCreateUserController(createUserUseCase: (input: CreateUserInput) => Promise<User>) {
    return async function createUser(request: Request, response: Response) {
        const validatedInput = CreateUserRequest.parse(request.body);

        const user = await createUserUseCase({
            name: validatedInput.name,
            email: validatedInput.email,
            password: validatedInput.password,
        });

        const result: CreateUserResponse = {
            id: user.id,
            name: user.name,
            email: user.email.getValue(),
        };

        response.status(201).json({ user: result });
    }
}
