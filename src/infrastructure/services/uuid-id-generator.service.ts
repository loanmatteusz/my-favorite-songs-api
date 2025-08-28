import { IdGenerator } from "../../domain/services/id-generator.service";
import { v4 as uuidv4 } from "uuid";

export const uuidIdGenerator: IdGenerator = {
    generate: () => uuidv4(),
};
