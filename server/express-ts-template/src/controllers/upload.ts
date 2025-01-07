import multiparty from 'multiparty'
import { Request, Response } from "express";
import { STATIC_TEMPORARY, STATIC_FILES } from "./constans";
import path from "path"
import fs from "fs-extra"
export class Upload {
  static async upload(req: Request, res: Response): Promise<void> {

    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      let chunk = files.file[0];
      let hash = fields.hash[0];
      let name = fields.name[0];
      let fileName = fields.fileName[0];
      let ext = path.extname(fileName);
      let fileRes = fileName.split(ext)[0];
      let dir = path.join(STATIC_TEMPORARY, "/" + fileRes + "-" + hash);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      const buffer = fs.readFileSync(chunk.path);
      let fileFinish = path.join(dir, name)
      const ws = fs.createWriteStream(fileFinish)
      ws.write(buffer)
      ws.close()
    })
    res.send({
      resultCode: 200,
      message: "ok",
      hideMsg: true
    });
  }
  static async merge(req: Request, res: Response): Promise<void> {
    let { fileName, hash } = req.query;
    const ext = path.extname(fileName as string);
    const fileNameStart = (fileName as string).split(ext)[0];
    try {
      let dir = path.join(STATIC_TEMPORARY, "/" + fileNameStart + "-" + hash);
      let len = 0
      let dirArr = fs.readdirSync(dir);
      dirArr = dirArr.sort((a: string, b: string) => { return parseInt(a.split("-")[1]) - parseInt(b.split("-")[1]) });
      let bufferArr = dirArr.map((item, index) => {
        const buffer = fs.readFileSync(path.join(dir, '/' + item));
        len += buffer.byteLength
        return buffer
      })
      //@ts-ignore
      const bufA = Buffer.concat(bufferArr, len);
      const ws = fs.createWriteStream(path.join(STATIC_FILES, "/" + fileNameStart + "-" + hash + ext))
      ws.write(bufA)
      ws.close()
      res.send({
        resultCode: 200,
        message: "ok",
      });
    } catch (error) {
      console.error(error)
    }


  }
  static async check(req: Request, res: Response): Promise<void> {
    let { fileName, hash } = req.query;
    const ext = path.extname(fileName as string);
    const fileNameStart = (fileName as string).split(ext)[0];
    try {
      let dir = path.join(STATIC_TEMPORARY, "/" + fileNameStart + "-" + hash);
      let dirArr = fs.readdirSync(dir);
      res.send({
        resultCode: 200,
        message: "ok",
        data: {
          exitFileArr: dirArr
        }
      });
    } catch (err) { }
  }
  static async exist(req: Request, res: Response): Promise<void> {
    let { fileName, hash } = req.query;
    const ext = path.extname(fileName as string);
    const fileNameStart = (fileName as string).split(ext)[0];
    try {
      let filePath = path.join(STATIC_FILES, "/" + fileNameStart + "-" + hash + ext);
      if (fs.existsSync(filePath)) {
        res.send({
          resultCode: 200,
          message: "ok",
          data: { exist: true }
        });
      } else {
        res.send({
          resultCode: 200,
          message: "ok",
          data: { exist: false }
        });
      }
    } catch (err) { }
  }
}