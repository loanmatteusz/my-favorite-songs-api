import { Router } from "express";
import type { Router as RouterType } from "express";

export function makeUserRoutes(deps: {
    createUserController: (req: any, res: any) => Promise<void>;
}): RouterType {
    const router = Router();

    router.post("/users", deps.createUserController);
    // router.get("/users/:id", deps.getUserController);

    return router;
}
