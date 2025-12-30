import express from "express";
import { postRouter } from "./modules/post/post.router";

const app = express();

app.use("/post",postRouter)



app.get("/", (req, res) => {
    res.send("Hello, World!");
    console.log('hello')
});
export default app;