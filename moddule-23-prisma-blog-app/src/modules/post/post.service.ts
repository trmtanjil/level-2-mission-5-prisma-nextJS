import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"


const getAllPost=async({
    search,tags,isFeatured,status,authorId,page,limit,
    skip,
    sortBy,
    sortOrder}
    :{search:string |undefined,
    tags:string[]|[],
    isFeatured :boolean|undefined,
     status: PostStatus | undefined,
     authorId: string | undefined,
     page:number,
     limit:number,
     skip:number,
     sortBy:string ,
     sortOrder:string 
})=>{

    const andConditions:PostWhereInput[]=[]

    if(search) 
        andConditions.push(
     { OR:[
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
        ]})
       

        if(tags.length>0)
            andConditions.push({  tags:{
            hasEvery:tags   
        }})
            

        if(typeof isFeatured==="boolean"){
            andConditions.push (
                {
                isFeatured
            }
            )
        }

        if(status){
            andConditions.push({
                status
            })
        }

        if(authorId){
            andConditions.push({
                authorId
            })
        }

const allPost =await prisma.post.findMany({
    take:limit,
    skip,
    where:{
   AND: andConditions
    },
    orderBy:{
        [sortBy]:sortOrder
    },
    include:{
        _count:{
        select:{coments:true}
    }
    }
});

const total=await prisma.post.count({
    where:{
        AND:andConditions
    }
})

 return {
    data: allPost,
    pagination:{
        total,
        page,
        limit,
        totalPages:Math.ceil(total/limit)
    },

 };
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

const getPostById= async (postId:string)=>{

return await prisma.$transaction(async (trm)=>{

 await trm.post.update({
        where:{
            id:postId
        },
        data:{
            views:{
                increment:1
            }
            
        }
    })

const postData = await trm.post.findUnique({
    where:{
        id:postId
    },
    include:{
        coments:{
            where:{
                parentId:null,
                status:CommentStatus.APROVED
            },
            orderBy:{createdAt:"desc"},
            include:{
                repies:{
                    where:{
                        status:CommentStatus.APROVED
                    },
                    orderBy:{createdAt:"asc"},
                    include:{
                        repies:{
                            where:{
                                status:CommentStatus.APROVED
                            },
                            orderBy:{createdAt:"asc"}
                        }
                    }
                }
            }
        },
         _count:{
        select:{coments:true}
    }
    }
   
})
return postData;
})
}

const getMyPost=async(authorId:string)=>{
    const result = await prisma.post.findMany({
        where:{
            authorId
        },
        orderBy:{
            createdAt:"desc"
        }
    }) 
    return result
}

export const postService={
    createPost,
    getAllPost,
    getPostById,
    getMyPost
}