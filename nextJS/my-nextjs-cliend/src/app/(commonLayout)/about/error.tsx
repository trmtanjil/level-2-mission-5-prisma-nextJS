"use client"
import React, { useEffect } from 'react'

export default function AboutErrot({error, reset}:
    {error:Error &{digest?:string};
    reset:()=>void
}) {

    useEffect(()=>{
        console.log(error)
    },[])



  return (
<div>
        <h1>something went wrong plese try again  </h1>
    <button onClick={()=>reset()}>retry</button>
</div>
  )
}
