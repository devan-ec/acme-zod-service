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

export const cancelOrderSchema = z.object({
  params: z.object({ orderId: z.uuid() }),
  body: z.object({ reason: z.enum(["customer_request", "out_of_stock", "duplicate"]) }),
});

export const updateOrderAddressSchema = z.object({
  params: z.object({ orderId: z.uuid() }),
  body: z.object({ street: z.string(), city: z.string(), postalCode: z.string() }),
});

export const ordersRouter = Router();
ordersRouter.get("/", ZodRequestValidationMiddleware(listOrdersSchema), (_req, res) => res.json([]));
ordersRouter.get("/:orderId", ZodRequestValidationMiddleware(getOrderSchema), (req, res) => res.json({ orderId: req.params.orderId }));
ordersRouter.post("/", ZodRequestValidationMiddleware(createOrderSchema), (_req, res) => res.status(201).json({ ok: true }));
ordersRouter.post("/:orderId/cancel", ZodRequestValidationMiddleware(cancelOrderSchema), (req, res) => res.json({ orderId: req.params.orderId, status: "cancelled" }));
ordersRouter.patch("/:orderId/address", ZodRequestValidationMiddleware(updateOrderAddressSchema), (req, res) => res.json({ orderId: req.params.orderId }));
