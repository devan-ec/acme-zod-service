import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function ZodRequestValidationMiddleware(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ params: req.params, query: req.query, body: req.body });
    if (!result.success) return res.status(400).json({ issues: result.error.issues });
    return next();
  };
}
