import { RequestHandler } from "express";

export const uuidValidator: RequestHandler = (req, res, next) => {
  const regex = new RegExp(
    /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
  );
  if (!regex.test(req.params.id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  next();
};
