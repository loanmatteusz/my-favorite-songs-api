import { bcryptHasher } from "../../../src/infrastructure/services/bcrypt-hasher.service";

describe("BcryptHasher Service", () => {
    it("should hash a plain password and return a non-empty string", async () => {
        const plain = "T3st!@#$%";
        const hash: string = await bcryptHasher.hash(plain);

        expect(typeof hash).toBe("string");
        expect(hash).not.toBe("");
        expect(hash).not.toBeNull();
    });

    it("should not return the same string as the plain password", async () => {
        const plain = "T3st!@#$%";
        const hash = await bcryptHasher.hash(plain);

        expect(hash).not.toEqual(plain);
    });

    it("should return true when comparing correct plain password with its hash", async () => {
        const plain = "T3st!@#$%";
        const hash = await bcryptHasher.hash(plain);
        const compare = await bcryptHasher.compare(plain, hash);

        expect(compare).toBe(true);
    });

    it("should return false when comparing incorrect plain password with hash", async () => {
        const plain = "T3st!@#$%";
        const wrongPlain = "Wr0ng!@#$%"
        const hash = await bcryptHasher.hash(plain);
        const compare = await bcryptHasher.compare(wrongPlain, hash);

        expect(compare).toBe(false);
    });

    it("should consistently generate different hashes for the same plain password", async () => {
        const plain = "T3st!@#$%";
        const hash1 = await bcryptHasher.hash(plain);
        const hash2 = await bcryptHasher.hash(plain);

        expect(hash1).not.toEqual(hash2);
    });
});
