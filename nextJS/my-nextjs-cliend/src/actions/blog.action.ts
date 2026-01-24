"use server"

import { BlogData, blogServices } from "@/services/blog.services"
 import { updateTag } from "next/cache";


 export const getblogs = async  ()=> {
     return await blogServices.getBlogPosts()

}
 
export const createBlogPost = async (data:BlogData)=>{
    return await blogServices.createBlogPost(data)
}