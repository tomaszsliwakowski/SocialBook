import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server on");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
