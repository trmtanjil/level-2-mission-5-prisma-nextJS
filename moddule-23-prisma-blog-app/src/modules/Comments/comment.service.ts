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



export const commentService ={
    createComment
}