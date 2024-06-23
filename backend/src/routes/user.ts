import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@hzaki78/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const result = signupInput.safeParse(body);
    if (!result.success) {
      c.status(411);
      return c.json({
        msg: "invalid/incorrect inputs",
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id , email : user.email }, c.env.JWT_SECRET);
    return c.text(token);
  } catch (error) {
    
    c.status(411);
    return c.json({
      msg: "invalid",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid/incorrect inputs",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    c.status(404);
    return c.json({
      msg: "user not found",
    });
  }
  const jwt = await sign({ id: user.id , email: user.email }, c.env.JWT_SECRET);

  return c.text(jwt);
});
