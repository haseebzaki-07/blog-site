import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@hzaki78/medium-common";


export const postRouter = new Hono<{
    Bindings :{
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
      userId : string;

   
    }
}>()



postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select : {
      content: true,
      title: true,
      id:true,
      author : {
        select : {
          name : true
        }
      }
      ,authorId : true
      
    }
  })
  return c.json({
     blogs
  })
});


  
postRouter.get("/:id",async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
    const post = await prisma.post.findFirst({
      where:{
         id : id
      },
      select : {
        id : true,
        title : true,
        content :true,
        author : {
          select : {
            name : true
          }
        },
        authorId : true
      }
    })

    return c.json({
      post
    })
  } catch (error) {
    c.status(411)
    return c.json({
     msg : "error while fetching blog post"
    })
  }
  
  

});



postRouter.use("/*" ,async (c, next) =>{
  const header = c.req.header("authorization") || "";
  
  const user = await verify(header, c.env.JWT_SECRET)
  try {
    if(user && typeof user.id==="string"){
      c.set("userId" , user.id)
     await next()
    }else{
     c.status(403)
     return c.json({
       msg : "unauthorized"
     })
    }
  } catch (error) {
    c.status(403)
     return c.json({
       msg : "you are not logged in!"
     })
  }
})

postRouter.post("/", async (c) => {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body =await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success) {
      c.status(411)
      return c.json({
        msg : "inputs not correct"
      })
    }
    const authorId = c.get("userId");
    const post = await prisma.post.create({
      data:{
        title : body.title,
        content: body.content,
        published : false,
        authorId : authorId
      }
    })
    return c.json({
      id : post.id,
      msg : "ypur post is successfully uploaded!"
    });

  });
  
  postRouter.put("/",async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success) {
      c.status(411)
      return c.json({
        msg : "inputs not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const authorId = c.get("userId");
    const post = await prisma.post.update({
      where:{
        id : body.id
      },
      data:{
        title : body.title,
        content: body.content,
        published : false,
        authorId : authorId
      }
    })
    return c.json({
      id : post.id,
      msg : "your post is successfully updated!"
    });


  });

  postRouter.delete("/:id" , async (c) =>{
    try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.post.delete({
      where : {
        id : id ,
      }
    })
     return c.text("Your post is successfully deleted!")
    } catch (error) {
      return c.text("error while deleting!")
    }
  })

