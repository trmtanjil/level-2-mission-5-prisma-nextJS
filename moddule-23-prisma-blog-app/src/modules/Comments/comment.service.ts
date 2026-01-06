import { prisma } from "../../lib/prisma"

const createComment = async(payload:{
    content:string,
    authorId:string,
    postId:string,
    parantId?:string
})=>{

 await prisma.post.findUniqueOrThrow({
        where:{
            id:payload.postId
        }
    })

    if(payload.parantId){
         await prisma.coment.findFirstOrThrow({
            where:{
                id:payload.parantId
            }
        })
    }

   return  await prisma.coment.create ({
    data:payload
   })
}

const getCommentById=async(id:string)=>{
    return prisma.coment.findUnique({
        where:{
            id
        },
        include:{
            post:{
                select:{
                    id:true,
                    title:true,
                    views:true
                }
            }
        }
    })


}

const getCommentAuthor=async(authorId:string)=>{
return await  prisma.coment.findMany({
    where:{
      authorId
    }
})
}


export const commentService ={
    createComment,
    getCommentById,
    getCommentAuthor
}