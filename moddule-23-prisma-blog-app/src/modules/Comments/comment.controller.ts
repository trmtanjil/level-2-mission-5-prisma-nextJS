import { Request, Response } from "express";
import { commentService } from "./comment.service";


const createComment = async(req:Request, res:Response)=>{
try{

    const user = req.user;
    req.body.authorId = user?.id

    const result = await commentService.createComment(req.body)

    res.status(200).json(result)

}catch(error){
res.status(401).json({
    error:"comment creation faild",
    detail:error
})
}
}


const getCommentById=async(req:Request,res:Response)=>{
    try{
        const {commentId}=req.params
        const result = await commentService.getCommentById(commentId as string)
        console.log('comment')
        res.status(200).json(result)
    }
    catch(error){
        res.status(401).json({
            error:"comment not found by id ",
            detail:error
        })
    }
}

const getCommentAuthor=async(req:Request, res:Response)=>{
try{
const {authorId}= req.params;
const result = await commentService.getCommentAuthor(authorId as string)
res.status(200).json(result)
}catch(error){
    res.status(401).json({
        error:"get comment by author error",
        details:error
    })
}
}

export const commentController = {
createComment,
getCommentById,
getCommentAuthor
}