
import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path"
export class AsyncRouter {
  static async getAsyncRouter(req: Request, res: Response): Promise<void> {
    let json = await fs.readJson(path.join(__dirname, "./asyncRoutes.json"));
    res.json({
      resultCode: 200,
      message: "success",
      data: {
        asyncRouter: json
      }
    })
  }


}