import express, { Application } from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { commentRouter } from "./modules/Comments/comement.router";
import errorHandler from "./middalewared/globalErrorHandler";
import { notFount } from "./middalewared/notFound";

const app: Application = express();
app.use(express.json());


app.use(cors({
origin:process.env.APP_URL|| "http://localhost:4000",
credentials:true
}))


app.use("/post",postRouter)

app.use("/comments",commentRouter)

app.all("/api/auth/*splat", toNodeHandler(auth));



app.get("/", (req, res) => {
    res.send("Hello, World!");
    console.log('hello')
});
app.use(notFount)
app.use(errorHandler)

export default app;