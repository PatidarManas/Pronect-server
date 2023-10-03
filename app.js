import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./Routes/Auth.js";
import projectrouter from "./Routes/Projectroute.js";
import adminrouter from "./Routes/Admin.js";

const app = express();


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

export default app;

app.use("/auth",authrouter)
app.use("/project",projectrouter)
app.use("/admin",adminrouter)

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);