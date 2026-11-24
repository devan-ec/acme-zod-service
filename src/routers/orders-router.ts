import { Router } from "express";
import { z } from "zod";
import { ZodRequestValidationMiddleware } from "../middleware/validation";

export const listOrdersSchema = z.object({
  query: z.object({ status: z.enum(["open", "shipped", "cancelled"]).optional() }),
});

export const getOrderSchema = z.object({
  params: z.object({ orderId: z.uuid() }),
});

export const createOrderSchema = z.object({
  body: z.object({
    customerId: z.string().min(1),
    items: z.array(z.object({ sku: z.string(), quantity: z.number().int().positive() })).min(1),
  }),
});

export const ordersRouter = Router();
ordersRouter.get("/", ZodRequestValidationMiddleware(listOrdersSchema), (_req, res) => res.json([]));
ordersRouter.get("/:orderId", ZodRequestValidationMiddleware(getOrderSchema), (req, res) => res.json({ orderId: req.params.orderId }));
ordersRouter.post("/", ZodRequestValidationMiddleware(createOrderSchema), (_req, res) => res.status(201).json({ ok: true }));
