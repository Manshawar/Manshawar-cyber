
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
export class User {
  static async info(req: Request, res: Response): Promise<void> {
    res.json({
      resultCode: 200,
      message: "success",
      data: {
        role: ["admin"],
        nickName: "zhangsan"
      }
    })
  }
  static async login(req: Request, res: Response): Promise<void> {

    let { userName, passwordMd5 } = req.body;
    if (userName !== 'admin' || passwordMd5 !== 'e10adc3949ba59abbe56e057f20f883e') {
      res.json({
        resultCode: 500,
        message: "账号或密码错误",
        data: {}
      })
      return
    }
    const token = jwt.sign(
      {
        userName,
        passwordMd5
      },
      'secret12345',
      {
        expiresIn: 3600 * 24 * 3
      }
    )

    res.json({
      resultCode: 200,
      message: "success",
      data: {
        token
      }
    })

  }

}