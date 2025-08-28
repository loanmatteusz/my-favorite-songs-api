import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            statusCode: 400,
            error: "ValidationError",
            details: err.issues.map(e => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }

    if (err instanceof Error) {
        return res.status(500).json({
            statusCode: 500,
            error: err.name || "InternalServerError",
            message: err.message,
        });
    }

    return res.status(500).json({
        statusCode: 500,
        error: "UnknownError",
        message: "Unexpected error occurred",
    });
}
