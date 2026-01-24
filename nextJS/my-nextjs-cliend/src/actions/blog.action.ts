"use server"

import { BlogData, blogServices } from "@/services/blog.services"
 import { updateTag } from "next/cache";


 export const getblogs = async  ()=> {
     return await blogServices.getBlogPosts()

}
 