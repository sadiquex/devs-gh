import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateBody<T extends object>(dto: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const instance = plainToInstance(dto, req.body ?? {});
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
      const formatted = errors.map((e) => ({
        field: e.property,
        errors: Object.values(e.constraints || {}),
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors: formatted,
      });
    }

    req.body = instance;
    next();
  };
}
