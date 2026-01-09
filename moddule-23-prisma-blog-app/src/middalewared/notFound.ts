import { Request, Response } from "express";
import path from "node:path";

export  function notFount(req:Request, res:Response){
res.status(404).json({
    message:"rout not found",
    path: req.originalUrl,
    data:Date()
})
}