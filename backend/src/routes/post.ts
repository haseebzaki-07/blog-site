import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@hzaki78/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "10", 10);

  const offset = (page - 1) * limit;
  const [blogs, total] = await prisma.$transaction([
    prisma.post.findMany({
      skip: offset,
      take: limit,
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
        authorId: true,
      },
    }),
    prisma.post.count(),
  ]);

  return c.json({
    blogs,
    total,
    page,
    limit,
  });
});

postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        publishedDate: true,
        authorId: true,
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return c.json({
      post,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      msg: "error while fetching blog post",
    });
  }
});

postRouter.get("/:id/comment", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        content: true,

        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      msg: "Comments fetched successfully!",
      comments,
    });
  } catch (error) {
    c.status(400);
    return c.json({
      msg: "Error fetching comments for the post!",
      error: error,
    });
  }
});

 postRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";

  const user = await verify(header, c.env.JWT_SECRET);
  try {
    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "unauthorized",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      msg: "you are not logged in!",
    });
  }
});

postRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs not correct",
    });
  }
  const authorId = c.get("userId");
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: false,
      authorId: authorId,
      publishedDate: new Date(),
    },
  });
  return c.json({
    id: post.id,
    msg: "ypur post is successfully uploaded!",
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      published: false,
      authorId: authorId,
    },
  });
  return c.json({
    id: post.id,
    msg: "your post is successfully updated!",
  });
});

postRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      c.status(404);
      return c.json({ msg: "Post not found" });
    }

    if (post.authorId !== userId) {
      c.status(403);
      return c.json({ msg: "You are not authorized to delete this post" });
    }

  
    await prisma.like.deleteMany({
      where: { postId: id },
    });

    await prisma.comment.deleteMany({
      where: { postId: id },
    });

    
    await prisma.post.delete({
      where: { id },
    });

    return c.json({msg  : "Your post is successfully deleted!"});
  } catch (error) {
    console.error("Error deleting post:", error);
    c.status(500);
    return c.json({
      msg: "Error while deleting post",
      error: error
    });
  }
});

postRouter.post("/:id/like", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  const userId = c.get("userId");

  try {
    await prisma.like.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });
    return c.json({
      msg: "Post liked successfully!",
    });
  } catch (error) {
    c.status(400);
    return c.json({
      msg: "Error liking post or post already liked!",
    });
  }
});

postRouter.post("/:id/comment", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  const userId = c.get("userId");
  const body = await c.req.json();

  try {
    await prisma.comment.create({
      data: {
        content: body.content,
        userId: userId,
        postId: postId,
      },
    });
    return c.json({
      msg: "Commented successfully!",
    });
  } catch (error) {
    c.status(400);
    return c.json({
      msg: "Error commenting on post!",
      error: error,
    });
  }
});


postRouter.get("/user-like" , async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  
  
    try {
      const userId = c.get('userId');
      if (!userId) {
        c.status(400);
        return c.json({ message: 'User ID is required' });
      }
      
      console.log("User ID:", userId);
  
      const likes = await prisma.like.findMany({
        where: {
          userId: userId,
        },
        include: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
      console.log('Likes:', likes);
  
     
  
      const likedPosts = likes.map(like => ({
        postId: like.post ? like.post.id : null,
        title: like.post ? like.post.title : 'No title available',
      }));
  
     
  
      return c.json({
       
        likedPostsCount: likes.length,
        likedPosts: likedPosts,
        
      });
    } catch (error) {
      console.error('Error fetching like details:', error);
      c.status(500);
      return c.json({
        message: 'Error fetching like details',
        error: error
      });
    } finally {
      await prisma.$disconnect();
    }
})