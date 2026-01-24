"use client";

import { getblogs } from "@/actions/blog.action";
import { useEffect, useState } from "react"

 
export  default  function Aboutpage() {

  const [data, setData]= useState();
  const [error, setError]=useState <{message : string } | null |undefined>(null);

  console.log( "data c",data)
  console.log(error)

  useEffect(()=>{
    (async ()=>{
      const {data,error} = await  getblogs()
      
      setData(data)
      setError(error)
    })();
  },[])
  
  console.log(data)
  
  return (
    <div>this is Aboutpage</div>
  )
}

//  await new Promise((resolve)=>setTimeout(resolve, 4000))

//  throw new Error ("something  went wrong")