"use client";

import { blogServices } from "@/services/blog.services";
import { useEffect, useState } from "react"

 
export  default  function Aboutpage() {

  const [data, setData]= useState();

  console.log( "data c",data)

  useEffect(()=>{
    (async ()=>{
      const {data} = await blogServices.getBlogPosts()

      setData(data)
    })();
  },[])

  
  return (
    <div>this is Aboutpage</div>
  )
}

//  await new Promise((resolve)=>setTimeout(resolve, 4000))

//  throw new Error ("something  went wrong")