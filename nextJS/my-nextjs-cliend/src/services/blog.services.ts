import { env } from "@/env"


const API_URL=env.API_URL

export const blogServices={
    getBlogPosts: async function(){
        try{
            const res =await fetch(`${API_URL}/post`)

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