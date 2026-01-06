import { error } from "node:console"
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
    },
    orderBy:{createdAt:"desc"},
    include:{
        post:{
           select:{
            id:true,
            title:true

           }
        }
    }
})
}

//delete own comment 
//will be loged in
//checked own comment

const deletComment = async(commentId:string, authorId:string)=>{
    const commentData = await prisma.coment.findFirst({
        where:{
            id:commentId,
            authorId
        },
        select:{
            id:true
        }
    })
    if(!commentData){
        throw new Error ("your provide inpute is invelid")
    }

     return await prisma.coment.delete({
        where:{
            id:commentData.id
        }
    })
}

export const commentService ={
    createComment,
    getCommentById,
    getCommentAuthor,
    deletComment
}