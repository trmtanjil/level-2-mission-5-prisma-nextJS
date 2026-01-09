import { NextFunction, Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../paginationSortingHelper/paginationSortingHelper";
import { error } from "node:console";
import { UserRole } from "../../middalewared/auth";


 const createPost = async (req:Request, res:Response,next:NextFunction)=>{
      try{
        const user=req.user
        if(!user){
         return  res.status(400).json(
          
          {
            error:"unauthorized",
            
        })
        }
    
        const result = await postService.createPost(req.body,user.id as string)
        res.status(201).json(result)
      }catch(e){
        next(e)
      }
 }

const getAllPost=async(req:Request,res:Response)=>{
try{
  const {search}= req.query

  const tags= req.query.tags ?(req.query.tags as string).split(','):[]

  const isFeatured=req.query.isFeatured?
  req.query.isFeatured ==="true"
  ?true
  :req.query.isFeatured==="false"
  ?false
  :undefined
  :undefined

  const status= req.query.status as PostStatus | undefined

  const authorId =req.query.authorId as string |undefined

  const searchString = typeof search==="string"?search:undefined
  // const page= Number(req.query.page ?? 1);
  // const limit = Number(req.query.limit ?? 10)
  // const skip = (page-1)*limit
  // const sortBy = req.query.sortBy as string |undefined;
  // const sortOrder = req.query.sortOrder as string |undefined;

  const {page, limit,skip,sortBy,sortOrder} = paginationSortingHelper(req.query)
  
 
  const result =await postService.getAllPost({search: searchString,tags,isFeatured,status,authorId, page ,limit,skip,sortBy,sortOrder})
 
res.status(200).json(result)
}catch(err){
res.status(400).json({
            error:"Post creation faild",
            details:err
        })
}
}

const getPostById= async(req:Request, res:Response)=>{
  try{

    const {postId}= req.params;
    if(!postId){
      throw new Error("post id required!!")
    }
 
    const result =await postService.getPostById(postId);
    return res.status(200).json(result)
  }catch(error){
res.status(400).json({
            error:"Post creation faild",
            details:error
        })
}
}


const getMyPost = async(req:Request,res:Response)=>{
  try{
    const user= req.user
    if(!user){
      throw new Error("you are unauthorized ")
    }
    const result =await postService.getMyPost(user?.id as string)
    res.status(200).json(result)
  }catch(error){
    res.send(400).json({
      error:'single post find faild',
      details:error
    })
  }
}

const updatePost = async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const user= req.user
    if(!user){
      throw new Error("you are unauthorized ")
    }
    const isAdmin = user.role===UserRole.ADMIN
    console.log(isAdmin,user)
    const {postId}= req.params
    const result =await postService.updatePost(postId as string,req.body,  user?.id as string,isAdmin)
    res.status(200).json(result)
  }catch(error){
    next(error)
    // const errorMessate = (error instanceof Error)?error.message:"post update faild"
    // res.status(400).json({
    //   error: errorMessate,
    //   details:error
    // })
  }
}

const deletePost=async(req:Request, res:Response)=>{
try{
const user = req.user
const {postId} =req.params
const isAdmin = user?.role===UserRole.ADMIN;

const result = await postService.deletePost(postId as string, user?.id as string, isAdmin )

res.status(200).json(result)
}
catch(error){
    const errorMessate = (error instanceof Error)?error.message:"post update faild"
    res.status(400).json({
      error: errorMessate,
      details:error
    })
  }

}

const getStats=async(req:Request, res:Response)=>{
try{
 const result = await postService.getStats(  )

res.status(200).json(result)
 
res.status(200).json( )
}
catch(error){
    const errorMessate = (error instanceof Error)?error.message:"post update faild"
    res.status(400).json({
      error: errorMessate,
      details:error
    })
  }

}


 export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPost,
    updatePost,
    deletePost,
    getStats
 }