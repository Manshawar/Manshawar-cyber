import { AsyncRouter } from './../../controllers/asyncRouter';

import { Router } from "express";
const menuRouter = Router();
menuRouter.get("/asyncRoutes", AsyncRouter.getAsyncRouter)


export { menuRouter }