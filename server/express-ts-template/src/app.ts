import express from "express";
import logger from "morgan";
import * as path from "path";
import cors from "cors";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { expressjwt } from "express-jwt"
import bodyParser from "body-parser"
// Routes
import { index } from "./routes/index";
// Create Express server
export const app = express();
app.use(cors());
app.use(bodyParser.json())
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(
  expressjwt({
    secret: 'secret12345',
    algorithms: ["HS256"],
    getToken(req) {
      if (req.headers.token) {
        return req.headers.token as string
      }
    }
  }).unless({ path: ["/user/login"] })
);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
