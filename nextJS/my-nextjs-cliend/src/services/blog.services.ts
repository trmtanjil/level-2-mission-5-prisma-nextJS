import { env } from "@/env"
import { error } from "console"
import { cookies } from "next/headers"


const API_URL=env.API_URL

interface ServiceOptions{
    cache?:RequestCache,
    revalidate?:number
}

interface BlogPostParams {
    isFeatured?:boolean,
    search?:""
}
 
export interface BlogData {
  title: string;
  content: string;
  tag?: string[];
}

export const blogServices={
    getBlogPosts: async function(
        params?:BlogPostParams,
        options?:ServiceOptions
    ){
        try{
             const url = new URL(`${API_URL}/post`)
            if(params){
                Object.entries(params).forEach(([key,value])=>{
                    if(value !==undefined && value !==null && value !==""){
                        url.searchParams.append(key,value)
                    }

                })
            }
            // url.searchParams.append("key", "value")
            // console.log("url",url.toString())

            const config:RequestInit={};
            if(options?.cache){
                config.cache= options.cache
            }

            if(options?.revalidate){
                config.next = {revalidate:options.revalidate}
            }

            config.next ={...config.next, tags:["blogPost"]}
            const res =await fetch(url.toString(),config)

            // const res =await fetch(url.toString(),{
            //     next:{
            //         tags:["blogPost"]
            //     }
            // })

            console.log("res",res)

            const data =await res.json()
            console.log("data",data)


            //this is an example
            // if(data.succes){
            //     return 
            // }


            return {data:data, eroor:null }
        }
        catch(err){
            return {data:null, error:{message:"somthin went wrong for fetch"}}
        }
    },




    getBlogById:async function(id:string){
        try{
            const res = await fetch (`${API_URL}/post/${id}`);
            const data= await res.json()

            return {data:data, error:null}
        }
         catch(err){
            return {data:null, error:{message:"somthin went wrong for fetch"}}
        }
    },



    createBlogPost :async(blogData:BlogData)=>{
        try{
             const cookieStore = await cookies()
                    const res = await fetch(`${API_URL}/post`,{
                        method:"POST",
                        headers:{
                            "content-type":"application/json",
                            cookie:cookieStore.toString()
                        },
                        body:JSON.stringify(blogData)
                    })
                    const data = await res.json()

                    if(data.error){
                        return{
                            data:null,
                            error:{message: "Error post create faild"}
                        }
                    }
                    return {data:data,error:null}
                    
        }catch(error){
            return {data:null,error:{message:"somthing went wrong"}};
        }
    },
};

