import { Email } from "../value-objects/email";
import type { Password } from "../value-objects/password";

export type User = {
    id: string;
    name: string;
    email: Email;
    password: Password;
}
