import { env } from "@/env"


const API_URL=env.API_URL

interface ServiceOptions{
    cache?:RequestCache,
    revalidate?:number
}

interface BlogPostParams {
    isFeatured?:boolean,
    search?:""
}

export const blogServices={
    getBlogPosts: async function(params:BlogPostParams,options?:ServiceOptions){
        try{

            const url = new URL(`${API_URL}/post`)

            console.log( Object.entries(params))
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

            const res =await fetch(url.toString(),config)
            console.log("res",res)

            const data =await res.json()


            //this is an example
            // if(data.succes){
            //     return 
            // }


            return {data:data, eroor:null }
        }
        catch(err){
            return {data:null, error:{message:"somthin went wrong for fetch"}}
        }
    }
}