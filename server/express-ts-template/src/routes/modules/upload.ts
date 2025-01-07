
import { Router } from "express";
import { Upload } from "../../controllers/upload";
const uploadRouter = Router();
uploadRouter.post("/", Upload.upload)
uploadRouter.get("/merge", Upload.merge)
uploadRouter.get("/check", Upload.check)
uploadRouter.get("/exist", Upload.exist)

export { uploadRouter }