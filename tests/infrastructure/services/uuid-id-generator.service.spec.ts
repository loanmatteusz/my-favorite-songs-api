import { uuidIdGenerator } from "../../../src/infrastructure/services/uuid-id-generator.service";

describe("UuidIdGenerator Service", () => {
    it("should generate a valid UUID", () => {
        const id: string = uuidIdGenerator.generate();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // regex de UUID v4
    });

    it("should generate unique IDs", () => {
        const firstId = uuidIdGenerator.generate();
        const secondId = uuidIdGenerator.generate();

        expect(firstId).not.toEqual(secondId);
    });

    it("should not return null, undefined or empty string", () => {
        const id: string = uuidIdGenerator.generate();

        expect(id).toBeDefined();
        expect(id).not.toBeNull();
        expect(id).not.toBeUndefined();
        expect(id).not.toBe("");
    });
});
