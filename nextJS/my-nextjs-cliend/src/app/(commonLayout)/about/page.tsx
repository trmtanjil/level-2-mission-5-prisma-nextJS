
export const dynamic = 'force-dynamic'

export  default async function Aboutpage() {

 await new Promise((resolve)=>setTimeout(resolve, 4000))

//  throw new Error ("something  went wrong")

  return (
    <div>this is Aboutpage</div>
  )
}
