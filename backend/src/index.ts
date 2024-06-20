import { Hono } from "hono";

import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";
import { cors } from "hono/cors";


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


app.use("/*" , cors())
app.get("/",  (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter)

app.route("api/v1/blog" ,postRouter )



export default app;
