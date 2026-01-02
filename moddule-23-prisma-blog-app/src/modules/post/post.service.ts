import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"


const getAllPost=async({
    search,tags}
    :{search:string |undefined,
    tags:string[]|[]
})=>{

    const andConditions:PostWhereInput[]=[]

    if(search)  { OR:[
           { title:{
            contains:search  ,
            mode:"insensitive"
        }},
       { content:{
            contains:search  ,
            mode:'insensitive'
        }},
        {tags:{
            has:search  ,
        }}
        ]}

        if(tags){  tags:{
            hasEvery:tags   
        }}

const allPost =await prisma.post.findMany({
    where:{
   AND: andConditions
    }
});
 return allPost;
}

const createPost = async (data:Omit<Post,'id'|'createdAt'|'updatedAt'|'authorId'>,userId:string)=>{
    const result = await prisma.post.create({
        data:{
            ...data,
            authorId:userId
        }
    })
    return result;
}



export const postService={
    createPost,
    getAllPost
}