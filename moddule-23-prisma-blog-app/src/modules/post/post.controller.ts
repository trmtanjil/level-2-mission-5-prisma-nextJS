import { Request, Response } from "express";


 const craatePost = async (req:Request, res:Response)=>{
       console.log({req,res})
 }


 export const PostController = {
    craatePost
 }