import { z } from "zod";

// Schema de validação do input HTTP
export const CreateUserRequest = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must have at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});

// Tipo inferido a partir do schema
export type CreateUserRequestType = z.infer<typeof CreateUserRequest>;
