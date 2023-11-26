import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server On");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
