"use server"

import { blogServices } from "@/services/blog.services"


 export const getblogs = async  ()=> {
     return await blogServices.getBlogPosts()

}