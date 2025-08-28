export class Email {
    private constructor(private readonly value: string) { }

    public static create(value: string): Email {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            throw new Error("Invalid email format");
        }
        return new Email(value);
    }

    public getValue(): string {
        return this.value;
    }
}
