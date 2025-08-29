import { Router } from "express";
import type { Request, Response, Router as RouterType } from "express";

export function makeUserRoutes(deps: {
    createUserController: (req: Request, res: Response) => Promise<void>;
}): RouterType {
    const router = Router();

    router.post("/users", deps.createUserController);
    // router.get("/users/:id", deps.getUserController);

    return router;
}
