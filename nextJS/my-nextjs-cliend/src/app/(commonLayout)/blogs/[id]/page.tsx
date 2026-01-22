import React from 'react'

export default async function BlogPage({params}:
  {params:Promise<{id:string}>}) {

    const {id} = await params

  return (
    <div>
      <h1>this is blogPage{id}</h1>
    </div>
  )
}
