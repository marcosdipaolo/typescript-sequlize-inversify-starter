import { Request, Response, NextFunction } from "express";

export const userCreateValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  const failedFields: string[] = [];
  ["name", "email"].forEach((field: string) => {
    if (!body[field]) {
      failedFields.push(field);
      res.status(400).json({ error: `Field ${field} is required.` });
    }
  });
  if (failedFields.length) return;
  next();
};
