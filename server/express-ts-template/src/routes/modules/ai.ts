import { Router } from "express";
import {AI} from "../../controllers/ai"
const aiRouter = Router();

aiRouter.post("/asyncRoutes", AI.ask)

export {aiRouter}