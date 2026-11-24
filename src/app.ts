import express from "express";
import { rootRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(rootRouter);
app.listen(Number(process.env.PORT ?? 3001));
