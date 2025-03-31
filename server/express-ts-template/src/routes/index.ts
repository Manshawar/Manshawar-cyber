import { Router } from "express";
import { uploadRouter } from "./modules/upload";
import { userRouter } from "./modules/user";
import { menuRouter } from "./modules/menu";
import {aiRouter} from "./modules/ai"
export const index = Router();
index.use("/user", userRouter);
index.use("/upload", uploadRouter);
index.use("/menu", menuRouter)
index.use("/ai",aiRouter)