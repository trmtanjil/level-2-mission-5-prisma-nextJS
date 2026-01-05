const createComment = async(payload:{
    content:string,
    authorId:string,
    postId:string,
    parantId?:string
})=>{
    console.log('comment create ',payload)
}



export const commentService ={
    createComment
}