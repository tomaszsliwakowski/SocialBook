import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://social-book-bay.vercel.app/",
  })
);

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: "https://social-book-bay.vercel.app/",
    credentials: true,
  }),
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
