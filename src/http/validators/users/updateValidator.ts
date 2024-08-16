import { RequestHandler } from "express";

export const updateUserValidator: RequestHandler = (req, res, next) => {
  const body = req.body;
  if (!body.name && !body.email) {
    res.status(400).json({ error: "There nothing to update here." });
    return;
  }
  next();
};
