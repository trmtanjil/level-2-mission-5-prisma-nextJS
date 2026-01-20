 

import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
 


export default async function Home() {

  const cookieStore =await cookies()
  console.log("cokie store",cookieStore.toString())
 
  const res = await fetch("http://localhost:5000/api/auth/get-session",{
    headers:{
      Cookie:cookieStore.toString()
    },
    
  })

  const session =await res.json()

  console.log("res clg",session)

  return (
    <div>
      <Button>Click heare</Button>
    </div>
  );
}
