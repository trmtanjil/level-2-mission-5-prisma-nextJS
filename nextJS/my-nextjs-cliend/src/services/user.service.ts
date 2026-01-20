import { cookies } from "next/headers"

export const userService ={
getSession: async function () {
   try {
       const cookieStore =await cookies()
  console.log("cokie store",cookieStore.toString())
 
  const res = await fetch("http://localhost:5000/api/auth/get-session",{
    headers:{
      Cookie:cookieStore.toString()
    },
    cache:"no-store"
  })
  const session =await res.json()

  if(session===null){
    return{
        data:null, error:{message:"session is missing"}
    }
  }
  console.log("res clg",session)
  return {
    data:session, error:null
  }

   }
   catch(err){
    console.error({data:null,err:{message:"somthin went wrong"}})
   }
}
}