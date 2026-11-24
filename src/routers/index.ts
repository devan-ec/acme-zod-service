import { Router } from "express";
import { ordersRouter } from "./orders-router";

export const rootRouter = Router();
rootRouter.get("/health", (_req, res) => res.json({ status: "ok" }));
rootRouter.use("/orders", ordersRouter);
